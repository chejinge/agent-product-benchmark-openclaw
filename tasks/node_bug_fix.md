# Task 3: Node.js Bug Fix

## Objective

Identify and fix hidden bugs in a multi-file Node.js project, ensuring all tests pass.

## Task Description

Given a zip file containing:
- `inventory.js` — line total calculation + order summary builder
- `discount.js` — discount stacking logic
- `order.js` — validation + async processing
- `test.js` — test suite
- `package.json`

1. Unzip and read all source files
2. Run `npm test` to observe failures
3. Identify all bugs (including hidden ones, multi-file dependencies, async issues)
4. Fix bugs — modify only necessary files, do NOT modify `tests/`
5. Run `npm test` again — all tests must pass

## Known Bugs (for scoring reference)

| # | File | Bug | Type |
|---|------|-----|------|
| 1 | inventory.js | `1 + discountRate` instead of `1 - discountRate` | Hidden logic error |
| 2 | inventory.js | SKU totals overwritten instead of accumulated | Multi-file dependency |
| 3 | discount.js | Holiday discount stacking order reversed | Business logic |
| 4 | order.js | `quantity < 0` allows `quantity = 0`; `discountRate > 1` allows `discountRate = 1` | Boundary validation |
| 5 | test.js | Expected value `180` for accumulated SKU (should be `230`) | Test expectation error |

## Evaluation Criteria

| Dimension | What to Evaluate |
|-----------|-----------------|
| Autonomy | Did the agent find all 5 bugs without hints? Did it fix them in minimal files? |
| Tool Utilization | Did it run tests, read code, and apply targeted fixes? |
| Stability | Did it handle async test issues? Did it avoid modifying forbidden files? |

## Expected Output

- All tests pass (exit code 0)
- Modified files: inventory.js, discount.js, order.js, test.js
- Bug report with diff for each fix