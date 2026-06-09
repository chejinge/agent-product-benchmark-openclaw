# Task: Node.js Bug Fix

## Objective

Diagnose and fix bugs in a sample Node.js project.

## Task Description

The project in `artifacts/node_sample_project/` contains a simple Express API server with bugs. Your job:

1. Install dependencies (`npm install`)
2. Run the test suite (`npm test`) — tests will fail
3. Identify and fix the bugs
4. Verify all tests pass
5. Ensure no regressions

### Known Bug Categories

- Incorrect HTTP status codes on certain routes
- Missing input validation

## Evaluation Criteria

| Criterion | Weight | Description |
|---|---|---|
| Bug identification | 30% | All bugs correctly identified and described |
| Fix correctness | 30% | Fixes address root cause, not just symptoms |
| Tests pass | 20% | All existing tests pass after fixes |
| No regressions | 10% | No new test failures or broken functionality |
| Code quality | 10% | Fixes follow project conventions and best practices |

## Pass Conditions

- `npm test` exits with code 0
- All original bugs are fixed
- No new bugs introduced
