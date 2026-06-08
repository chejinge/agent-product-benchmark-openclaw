# Task 5: SaaS Billing Downgrade

## Objective

Implement the complete SaaS billing downgrade pipeline: validation → prorated refund → downgrade → rollback → credit note → email → audit → idempotency.

## Task Description

Given a project with:
- `docs/billing_policy.md` — business rules
- `data/` — customers, subscriptions, invoices, credit notes, email outbox, audit log, API call log
- `mocks/` — mockBillingApi (refund/rollback), mockSubscriptionApi (downgrade with 409)
- `src/` — services with intentional bugs

1. Read policy, data, mocks, and source files
2. Run `npm test` to observe failures
3. **Do NOT modify `tests/`**
4. **Do NOT hardcode test outputs**
5. Fix all bugs and implement the complete workflow:
   - Validate downgrade eligibility (5 conditions)
   - Calculate prorated refund using **unused days**
   - Issue refund via mockBillingApi
   - Downgrade via mockSubscriptionApi with **409 retry**
   - **Rollback refund** if downgrade fails after refund succeeds
   - Generate credit note with **negative amount**
   - Send customer + finance emails
   - Write audit log with **idempotency guard**
6. Run `npm test` again — all must pass

## Bugs to Fix (for scoring reference)

| # | File | Bug | Fix |
|---|------|-----|-----|
| 1 | policy.js | `calculateProratedRefund` uses `usedDays` instead of `unusedDays` | Use `unusedDays` |
| 2 | policy.js | `validateDowngrade` ignores `hasUnpaid` parameter | Add `hasUnpaid` check |
| 3 | invoiceService.js | Checks `amount > 0` instead of `status === "unpaid"` | Check `status === "unpaid"` |
| 4 | billingWorkflow.js | No 409 retry on downgrade API | Retry once after 409 |
| 5 | billingWorkflow.js | No rollback when downgrade fails after refund | Call `rollbackRefund` |
| 6 | creditNoteService.js | Amount not negative; no idempotency | `-amount` + idempotency guard |
| 7 | emailService.js | No idempotency guard | Check existing emails before sending |
| 8 | auditService.js | No idempotency guard | Check existing audit entries |

## Evaluation Criteria

| Dimension | What to Evaluate |
|-----------|-----------------|
| Autonomy | Did the agent find all 8 bugs and implement the full workflow? |
| Tool Utilization | Did it correctly use mock APIs, handle 409, and rollback? |
| Stability | Is idempotency guaranteed? Does rollback work? No data loss? |

## Expected Test Results

```
All SaaS Billing downgrade benchmark tests passed
```

Including idempotency: second run of CUST-1001 returns `NOT_PRO_ANNUAL` with no duplicate records.