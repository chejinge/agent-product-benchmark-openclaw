# Case 4: SaaS Refund Workflow

## Context

A SaaS backend must handle customer refund requests. The system must validate each order, call the billing API (with retry on failure), generate a credit note, send customer emails, and maintain an audit log — all with idempotency guarantees.

## Objective

Fix all bugs in the refund workflow so that every test passes and the system handles edge cases correctly.

## Refund Rules (from `docs/refund_policy.md`)

1. Order `status` must be exactly `"paid"`
2. `refunded` must be `false` (no double refunds)
3. `quantity` must be a positive integer (> 0, no decimals)
4. `unitPrice` must be > 0
5. `discountRate` must be `>= 0` and `< 1` (100% discount not allowed)
6. Order must be within **30 calendar days** of `orderDate` (inclusive)
7. Refund amount = `quantity * unitPrice * (1 - discountRate)`, rounded to 2 decimals
8. If mock refund API returns HTTP 500, retry **exactly once**
9. Do not call the API for ineligible orders
10. Send email and write audit log **only after API success**
11. Workflow must be **idempotent**: re-running the same refund must not create duplicate emails or audit records

## Project Structure

```
saas_refund_complex/
├── package.json
├── AGENT_TASK.md
├── docs/refund_policy.md
├── data/
│   ├── orders.json
│   ├── audit_log.json
│   └── email_outbox.json
├── src/
│   ├── refundWorkflow.js     ← main orchestrator
│   ├── policy.js             ← validation + amount calculation
│   ├── orderService.js       ← getOrder, markRefunded
│   ├── auditService.js       ← writeAuditLog
│   ├── emailService.js       ← sendRefundEmail
│   ├── fileStore.js
│   └── mockRefundApi.js      ← mock billing API
└── tests/
    ├── refundFlow.test.js     ← (DO NOT MODIFY)
    └── resetState.js
```

## Constraints
- **Do not modify any file in `tests/`**
- Do not hardcode test output values
- The `refunded` field on orders must be updated correctly (not `refund`)
- Idempotency guards must use the actual order state, not in-memory flags

## Test Assertions (`tests/refundFlow.test.js`)

| Order | Expected Result | Notes |
|-------|----------------|-------|
| ORD-9001 | `success: true`, amount `$180.00` | discount applied correctly, retry 500→200 |
| ORD-9002 | `success: false`, reason `STATUS_NOT_PAID` | |
| ORD-9003 | `success: false`, reason `OUTSIDE_REFUND_WINDOW` | 47 days old |
| ORD-9004 | `success: false`, reason `INVALID_QUANTITY` | qty=0 |
| ORD-9005 | `success: false`, reason `ALREADY_REFUNDED` | |
| ORD-9006 | `success: true`, amount `$75.00` | 30-day boundary |
| ORD-9007 | `success: false`, reason `INVALID_QUANTITY` | decimal qty |
| ORD-9008 | `success: false`, reason `INVALID_DISCOUNT` | discountRate=1 |

API call log must contain exactly: `ORD-9001:500`, `ORD-9001:200`, `ORD-9006:200`

## Artifacts
- `artifacts/saas_refund_complex_benchmark.zip` — Full self-contained project

## Success Criteria
1. `npm test` exits with code 0
2. All 12 test assertions pass
3. API called only for ORD-9001 (×2) and ORD-9006 (×1)
4. Credit notes, emails, and audit log contain only successful refunds
5. Re-running `processRefund('ORD-9001')` returns `ALREADY_REFUNDED` with no duplicate records

## Evaluation Dimensions
| Dimension | What to Observe |
|-----------|----------------|
| Business Logic | All 11 refund rules implemented correctly |
| Retry Logic | 500 → retry → success path |
| Idempotency | markRefunded before side effects; guard checks |
| Tool Usage | Full workflow trace through multiple modules |
| Stability | No race conditions, no duplicate side effects |