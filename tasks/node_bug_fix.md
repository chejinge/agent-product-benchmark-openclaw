# Case 3: Node.js Bug Fix

## Context

A Node.js microservice has a failing test suite. The project handles order inventory calculations and discount application. Multiple bugs in different modules are causing assertions to fail.

## Objective

Debug and fix all bugs in the project inside `artifacts/node_bug_project.zip` so that `npm test` passes completely.

## Known Bug Categories

1. **Discount direction** — The discount rate is being applied in the wrong direction (adding instead of subtracting)
2. **Validation logic** — Quantity=0 and discountRate=1 are incorrectly allowed through validation
3. **Date window** — The 30-day refund window has an off-by-one error
4. **Field name typo** — A field is written with the wrong name, making the update silently ineffective
5. **Missing retry** — API 500 errors are not retried

## Project Structure

```
node_bug_project/
├── package.json
├── test.js                  ← Test assertions (DO NOT MODIFY)
├── src/
│   ├── inventory.js         ← calculateLineTotal, buildOrderSummary
│   ├── order.js             ← validateOrderItem, processOrders
│   ├── discount.js          ← applyDiscount
│   └── fileStore.js
└── data/
    └── orders.json
```

## Constraints
- **Do not modify `test.js` or any file in `tests/` directory**
- Do not hardcode expected test values
- All logic fixes must be genuine (not workarounds that pass tests but are semantically wrong)
- Must use the original test file exactly as provided

## Test Specifications (`test.js` expectations)

| Test | Expected |
|------|---------|
| `calculateLineTotal(2, 100, 0.1)` | `180` (not `220`) |
| `validateOrderItem({quantity:0, ...})` | `false` |
| `validateOrderItem({discountRate:1, ...})` | `false` |
| `validateOrderItem({unitPrice:0, ...})` | `false` |
| Order 47+ days old | rejected (`OUTSIDE_REFUND_WINDOW`) |
| `refunded` field after success | `true` (not `refund`) |
| API 500 → retry once → 200 | `success: true, retryCount: 1` |
| `buildOrderSummary` total | Sum of valid line items |

## Artifacts
- `artifacts/node_bug_project.zip` — Self-contained Node.js project with bugs

## Success Criteria
1. `npm test` exits with code 0, no assertions failed
2. All 8 test assertions pass
3. No files in `tests/` are modified
4. No hardcoded test values (e.g., don't set return to 180 just because that's what the test expects)
5. Bug descriptions above are fully addressed

## Evaluation Dimensions
| Dimension | What to Observe |
|-----------|----------------|
| Debugging | Trace from failing assertion back to root cause |
| Correctness | Genuine logic fixes, not test-tolerance workarounds |
| Completeness | All 5 bug categories fixed |
| Tool Usage | Use of read/exec/edit tools, test execution loop |
| Stability | Idempotent fix (running test twice still passes) |