# Scoring Rubric — Agent Product Benchmark

## Evaluation Dimensions

Each benchmark case is scored on three dimensions, weighted as follows:

| Dimension | Weight | Description |
|-----------|--------|-------------|
| **Autonomy** | 40% | Steps completed without human intervention; self-correction ability |
| **Tool Utilization** | 30% | Correct tool selection; API call accuracy; error handling |
| **Stability** | 30% | Edge case handling; rollback correctness; idempotency; no data loss |

## Scoring Formula

```
CaseScore = 0.4 × AutonomyScore + 0.3 × ToolScore + 0.3 × StabilityScore
TotalScore = Σ(CaseScore_i) / N
```

Each sub-score is on a 0–10 scale:

- **0**: Completely failed or no attempt
- **3**: Partial completion with significant errors
- **5**: Mostly correct but missed edge cases or needed human help
- **7**: Correct with minor issues
- **10**: Perfect — fully autonomous, correct tools, stable under all conditions

## Autonomy Scoring Criteria

| Score | Criteria |
|-------|----------|
| 0–2 | Required constant human guidance; asked for confirmation on every step |
| 3–4 | Completed main flow but needed help on 2+ steps |
| 5–6 | Completed main flow autonomously; asked 1 clarification question |
| 7–8 | Fully autonomous; minor self-corrections |
| 9–10 | Fully autonomous with proactive error recovery and optimization |

## Tool Utilization Scoring Criteria

| Score | Criteria |
|-------|----------|
| 0–2 | Wrong tools selected; API calls failed; no error handling |
| 3–4 | Correct tool selection but 2+ incorrect API parameters |
| 5–6 | Mostly correct; 1 incorrect parameter or missed optimization |
| 7–8 | All tools correct; efficient call patterns |
| 9–10 | Optimal tool usage; batched calls; minimal redundant operations |

## Stability Scoring Criteria

| Score | Criteria |
|-------|----------|
| 0–2 | Data loss on errors; no rollback; crashes on edge cases |
| 3–4 | Handles some errors but misses critical edge cases |
| 5–6 | Handles main errors; rollback works but idempotency incomplete |
| 7–8 | Full rollback + idempotency; minor edge case gaps |
| 9–10 | Perfect stability: rollback, idempotency, no data loss, graceful degradation |

## Per-Case Bonus/Penalty

| Modifier | Condition | Adjustment |
|----------|-----------|------------|
| Bonus | Proactive documentation of decisions | +1 to Autonomy |
| Bonus | Batched API calls instead of serial | +1 to Tool Utilization |
| Penalty | Hardcoded test outputs | -3 to Tool Utilization |
| Penalty | Modified test files (when forbidden) | -5 to Autonomy |
| Penalty | Data loss on rollback failure | -3 to Stability |

## Final Ranking

Agents are ranked by `TotalScore`. Ties broken by:
1. Higher Autonomy score
2. Higher Stability score
3. Fewer total tool calls (efficiency)