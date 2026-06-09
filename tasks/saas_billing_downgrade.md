# Task: SaaS Billing Downgrade

## Objective

Downgrade a customer's subscription plan, handling usage limits and feature access.

## Task Description

A customer wants to downgrade from the Enterprise plan to the Professional plan. You must:

1. **Check current usage** — Verify usage fits within Professional plan limits
2. **Apply downgrade** — Schedule downgrade at next billing cycle
3. **Adjust feature access** — Immediately restrict Enterprise-only features
4. **Notify customer** — Send confirmation with effective date and feature changes

### Plan Comparison

| Feature | Enterprise | Professional |
|---|---|---|
| Monthly Price | $99 | $49 |
| Team Members | Unlimited | 10 |
| Storage | 100 GB | 25 GB |
| API Calls/day | 10,000 | 1,000 |
| Priority Support | Yes | No |
| Custom Integrations | Yes | No |

### Customer Details

| Field | Value |
|---|---|
| Customer ID | CUST-2024-0078 |
| Current Plan | Enterprise |
| Current Usage | 8 team members, 18 GB storage, 850 API calls/day |
| Next Billing Date | 2024-07-01 |

## Evaluation Criteria

| Criterion | Weight | Description |
|---|---|---|
| Usage check | 25% | Correctly verifies usage fits within new plan limits |
| Downgrade scheduling | 25% | Downgrade scheduled for correct billing date |
| Feature restriction | 25% | Enterprise-only features immediately restricted |
| Customer notification | 15% | Clear confirmation with date and feature changes |
| Edge case handling | 10% | Handles over-limit scenarios gracefully |

## Pass Conditions

- Usage is verified to fit Professional plan limits
- Downgrade is scheduled for 2024-07-01
- Priority Support and Custom Integrations are immediately disabled
- Customer receives confirmation notification
