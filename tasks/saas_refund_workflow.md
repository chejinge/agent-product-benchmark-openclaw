# Task 4: SaaS Refund Workflow

## Objective

Implement a prorated refund workflow for a SaaS subscription downgrade, including rollback on failure and idempotency.

## Task Description

A customer requests to downgrade from `pro_annual` to `basic_monthly`. The system must:

1. Validate the downgrade request (customer active, subscription active, no unpaid invoices, not already downgraded)
2. Calculate prorated refund: `annualPrice × unusedDays / totalDays`, rounded to 2 decimals
3. Call billing API to issue refund
4. Call subscription API to downgrade
5. If downgrade fails after refund succeeds → **rollback the refund**
6. On success: update subscription, create credit note (negative amount), send emails, write audit log
7. **Idempotency**: re-running must not duplicate refund, credit note, emails, or audit records

## Evaluation Criteria

| Dimension | What to Evaluate |
|-----------|-----------------|
| Autonomy | Did the agent implement the full workflow end-to-end? |
| Tool Utilization | Did it correctly call mock APIs, handle 409 retry, and rollback? |
| Stability | Did it handle rollback correctly? Is idempotency guaranteed? |

## Key Scenarios

| Customer | Expected Result | Reason |
|----------|----------------|--------|
| CUST-1001 | ✅ Success | Normal downgrade, refund $687.12 |
| CUST-1002 | ❌ Rejected | Has unpaid invoice |
| CUST-1003 | ❌ Rejected | Not on pro_annual plan |
| CUST-1004 | ✅ Success (after retry) | First call returns 409, retry succeeds |
| CUST-1005 | ❌ Rolled back | Refund succeeds but downgrade fails → rollback |

## Edge Cases

- Subscription API returns 409 → reload and retry exactly once
- Refund succeeds but downgrade fails → must rollback refund
- Re-running same customer → must not duplicate any records