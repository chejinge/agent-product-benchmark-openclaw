# Case 5: SaaS Billing Downgrade

## Context

A SaaS customer requests to downgrade from `pro_annual` to `basic_monthly`. The system must calculate a prorated refund, call the billing API, downgrade the subscription, generate a credit note (negative amount), send both customer and finance emails, write an audit log, and handle rollback if the downgrade fails.

## Objective

Fix all bugs in the billing downgrade workflow so that every test passes.

## Downgrade Policy (from `docs/billing_policy.md`)

1. Customer `status` must be `"active"`
2. Current subscription must be `pro_annual`
3. Subscription `status` must be `"active"`
4. Target plan must be `basic_monthly`
5. Customer must have **no unpaid invoices**
6. `lastDowngradeAt` must be `null` (one downgrade per subscription)
7. Refund = `annualPrice * unusedDays / totalSubscriptionDays`, rounded to 2 decimals
8. **Refund must be issued before downgrade**
9. If refund succeeds but downgrade fails → **rollback the refund**
10. If subscription API returns 409 → reload subscription state → retry exactly once
11. On success: update subscription plan/price/lastDowngradeAt, create credit note, send emails, write audit
12. Workflow must be **idempotent** — re-running must not duplicate any side effects

## Project Structure

```
saas_billing_downgrade/
├── package.json
├── AGENT_TASK.md
├── docs/billing_policy.md
├── data/
│   ├── customers.json
│   ├── subscriptions.json
│   ├── invoices.json
│   ├── credit_notes.json
│   ├── email_outbox.json
│   ├── audit_log.json
│   └── api_call_log.json
├── mocks/
│   ├── mockBillingApi.js       ← refund, rollbackRefund
│   └── mockSubscriptionApi.js  ← downgrade (409/500 simulation)
├── src/
│   ├── billingWorkflow.js      ← main orchestrator
│   ├── policy.js               ← validateDowngrade, calculateProratedRefund
│   ├── customerService.js
│   ├── subscriptionService.js
│   ├── invoiceService.js       ← hasUnpaidInvoice
│   ├── creditNoteService.js    ← createCreditNote
│   ├── emailService.js         ← sendCustomerEmail, sendFinanceEmail
│   ├── auditService.js
│   └── fileStore.js
└── tests/
    ├── billing.test.js          ← (DO NOT MODIFY)
    └── resetState.js
```

## Test Assertions (`tests/billing.test.js`)

| Customer | Expected Result | Notes |
|----------|----------------|-------|
| CUST-1001 | `success: true`, refund `$687.12` | unused days calculation |
| CUST-1002 | `success: false`, reason `HAS_UNPAID_INVOICE` | unpaid invoice exists |
| CUST-1003 | `success: false`, reason `NOT_PRO_ANNUAL` | not on pro_annual plan |
| CUST-1004 | `success: true`, refund `$1081.64` | 409 → retry → success |
| CUST-1005 | `success: false`, reason `DOWNGRADE_ROLLED_BACK` | refund rolled back |

API call requirements:
- billing:refund for CUST-1001, CUST-1004, CUST-1005 (each ×1)
- subscription:downgrade for CUST-1001 (×1), CUST-1004 (×2, due to 409 retry), CUST-1005 (×1, fails)
- billing:rollbackRefund for CUST-1005 (×1)

Credit note amounts must be **negative**.
Emails: 2 customer + 2 finance emails for CUST-1001 and CUST-1004 only.

## Artifacts
- `artifacts/saas_billing_downgrade_benchmark.zip` — Full self-contained project

## Success Criteria
1. `npm test` exits with code 0
2. All 12 test assertions pass
3. CUST-1005 subscription remains `pro_annual` after failed downgrade (rollback worked)
4. Credit note amounts are negative (not positive)
5. Re-running `processDowngrade('CUST-1001')` returns `NOT_PRO_ANNUAL` with no duplicate side effects

## Evaluation Dimensions
| Dimension | What to Observe |
|-----------|----------------|
| Business Logic | All 12 policy rules implemented |
| Rollback | Correct rollbackRefund call when downgrade fails |
| 409 Retry | Correct reload + retry path |
| Idempotency | Guard checks before every side effect |
| Multi-step | Full trace through refund → subscription → credit note → emails → audit |
| Stability | No state leaks across customers |