# Task: SaaS Refund Workflow

## Objective

Process a refund request through a simulated SaaS billing system.

## Task Description

A customer requests a refund for their subscription. You must:

1. **Validate eligibility** — Check if the customer is within the refund window (30 days from purchase)
2. **Calculate prorated amount** — If partial month used, calculate the refund as: `(remaining_days / total_days_in_month) * monthly_price`
3. **Issue refund** — Call the refund API endpoint with the calculated amount
4. **Send confirmation** — Trigger a confirmation email to the customer

### Customer Details

Customer ID: CUST-2024-0042
Plan: Professional ($49/month)
Purchase Date: 2024-05-15
Refund Request Date: 2024-06-03
Days Used: 19
Days Remaining: 12

### API Endpoints (simulated)

- POST /api/refunds — Body: { customer_id, amount, reason } → Returns { refund_id, status }
- POST /api/emails — Body: { to, template, data } → Returns { message_id, status }

## Evaluation Criteria

| Criterion | Weight | Description |
|---|---|---|
| Eligibility check | 20% | Correctly determines refund eligibility |
| Proration calculation | 30% | Correct prorated amount calculated |
| API call correctness | 25% | Refund API called with correct parameters |
| Email notification | 15% | Confirmation email triggered with correct data |
| Error handling | 10% | Graceful handling of edge cases |

## Pass Conditions

- Eligibility is correctly determined (within 30-day window)
- Prorated amount is correct: $49 * (12/30) = $19.60
- Refund API is called with correct customer ID and amount
- Confirmation email is sent
