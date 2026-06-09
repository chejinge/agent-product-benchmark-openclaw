# Scoring Rubric

## Dimensions

Each task is scored on four dimensions, each worth 0–25 points. Total score: 0–100.

### 1. Autonomy (0–25)

How independently can the agent complete the task without human intervention?

| Tier | Points | Criteria |
|---|---|---|
| Expert | 21–25 | Completes task with zero human intervention; handles edge cases and errors autonomously |
| Proficient | 11–20 | Completes task with minimal clarification; may ask 1–2 questions |
| Basic | 0–10 | Requires significant hand-holding; cannot proceed without human guidance at multiple steps |

### 2. Tool Utilization (0–25)

How effectively does the agent use available tools (APIs, CLIs, file operations)?

| Tier | Points | Criteria |
|---|---|---|
| Expert | 21–25 | Uses tools idiomatically; chains tools efficiently; discovers and uses advanced features |
| Proficient | 11–20 | Uses core tools correctly; may miss optional features or use suboptimal sequences |
| Basic | 0–10 | Struggles with tool invocation; frequent errors; cannot chain operations |

### 3. Accuracy (0–25)

How correct is the final output?

| Tier | Points | Criteria |
|---|---|---|
| Expert | 21–25 | Output is fully correct; all edge cases handled; no regressions |
| Proficient | 11–20 | Core output correct; minor issues on edge cases or formatting |
| Basic | 0–10 | Significant errors in output; missing requirements |

### 4. Stability (0–25)

How reliably does the agent perform without crashes, loops, or inconsistent behavior?

| Tier | Points | Criteria |
|---|---|---|
| Expert | 21–25 | No crashes, loops, or retries needed; consistent across runs |
| Proficient | 11–20 | Minor instability; recovers gracefully from errors |
| Basic | 0–10 | Crashes, infinite loops, or inconsistent results across attempts |

## Scoring Formula

```
Final Score = Autonomy + Tool Utilization + Accuracy + Stability
```

Range: 0–100

## Tiebreaker

If two agents have the same final score, the agent with **fewer total tool calls** wins.

## Scoring Template

For each task, record scores as follows:

| Dimension | Score (0–25) | Notes |
|---|---|---|
| Autonomy | | |
| Tool Utilization | | |
| Accuracy | | |
| Stability | | |
| **Total** | | |
| Tool Calls | |

## Overall Benchmark Score

Average the final scores across all tasks:

```
Benchmark Score = (Task1_Total + Task2_Total + ... + Task5_Total) / 5
```