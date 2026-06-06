# Scoring Rubric — Agent Benchmark Framework

> Multi-dimensional scoring system for AI agent evaluation in software engineering tasks.

---

## Scoring Overview

Each benchmark case is scored on **4 dimensions**, weighted by importance:

| Dimension | Weight | Rationale |
|-----------|--------|-----------|
| **Correctness** | 35% | Primary metric: does the solution actually work? |
| **Autonomy** | 25% | Can the agent self-plan and recover without human help? |
| **Tool Usage** | 25% | Effective use of available tools and infrastructure |
| **Stability** | 15% | Predictable, idempotent, crash-free execution |

Total maximum score: **100 points per case**.

---

## Dimension Definitions

### 1. Correctness (35 pts)

Measures whether the agent produces the correct output and passes all tests.

```
correctness_score =
    (tests_passed / total_tests) * 35
```

**Sub-components:**
- Functional test pass rate: 20 pts
- Business logic accuracy: 10 pts (assessed by human reviewer)
- Edge case handling: 5 pts (hidden tests or manual inspection)

**Perfect score conditions:**
- All test assertions pass (`npm test` exits 0)
- No workaround fixes (e.g., hardcoded values instead of real logic)
- Correct data transformations (e.g., correct formula usage)

---

### 2. Autonomy (25 pts)

Measures how independently the agent operates.

```
autonomy_score =
    base_autonomy - questions_asked * 2 - explicit_help_requests * 5
    + self_recovery_bonus
```

| Behavior | Score Impact |
|----------|-------------|
| Self-diagnoses error from stack trace | +3 pts |
| Recovers from API failure without asking | +3 pts |
| Clarifies ambiguous requirements proactively | -2 pts |
| Asks for confirmation before destructive action | -3 pts |
| Gives up and asks for solution | -8 pts |

**Scale:**
- 25 pts: Zero questions, full self-reliance
- 15–24 pts: 1–3 routine clarifying questions
- 5–14 pts: Multiple questions or 1 major help request
- 0–4 pts: Constant guidance needed

---

### 3. Tool Usage (25 pts)

Measures the effectiveness and breadth of tool utilization.

```
tool_usage_score =
    min(25, file_reads * 0.5 + file_writes * 1.0 + exec_calls * 1.5 + api_calls * 2.0)
```

**Bonus/Penalty:**
| Behavior | Score Impact |
|----------|-------------|
| Uses `exec` for testing (runs `npm test`) | +3 pts |
| Uses `read` before editing | +2 pts |
| Batch/parallel tool calls where appropriate | +2 pts |
| Redundant tool calls (repeated reads) | -1 pt each |
| Skips verification steps | -3 pts |
| Uses wrong tool for task | -2 pts |

**Tool call tracking:** All tool invocations are recorded in `tool_call_log`. Analyze:
- Read/write ratio
- Test execution frequency
- Error recovery tool sequences

---

### 4. Stability (15 pts)

Measures behavioral predictability and robustness.

```
stability_score =
    idempotency_score + crash_score + log_score
```

| Behavior | Score Impact |
|----------|-------------|
| Re-running produces identical results (idempotent) | +6 pts |
| No crashes or unhandled exceptions | +5 pts |
| Meaningful log/error messages | +4 pts |
| Duplicate side effects on rerun | -4 pts |
| Silent failures | -5 pts |
| Crashes | 0 pts |

---

## Per-Case Score Formula

```
case_score =
    correctness_score
  + autonomy_score
  + tool_usage_score
  + stability_score
```

**Grade Thresholds:**

| Score | Grade | Label |
|-------|-------|-------|
| 90–100 | A | Exceptional |
| 75–89 | B | Good |
| 60–74 | C | Acceptable |
| 40–59 | D | Needs Improvement |
| 0–39 | F | Unacceptable |

---

## Overall Benchmark Score

```
overall_score = mean(case_1_score, case_2_score, ..., case_5_score)
```

Agents are ranked by `overall_score` across all 5 cases.

---

## Tool Call Trajectory Metrics

For detailed analysis, compute from `tool_call_log`:

### Autonomy Metrics
- `questions_asked`: Count of explicit user questions before acting
- `self_discovery_rate`: % of bugs discovered via self-inspection vs. user hints
- `recovery_path_length`: Number of steps from error to resolution

### Tool Usage Metrics
- `tool_call_count`: Total tool invocations
- `read_write_ratio`: `read_count / (write_count + edit_count)`
- `exec_frequency`: How often agent runs `npm test` or shell commands
- `api_calls_made`: Direct HTTP/API calls

### Stability Metrics
- `crash_count`: Unhandled exceptions or process exits
- `duplicate_side_effects`: Repeated writes on idempotent operations
- `error_recovery_rate`: % of errors that agent recovered from autonomously

---

## Reporting Format

Record scores in `results/summary.md`:

```markdown
| Case | Agent | Correctness | Autonomy | Tool Usage | Stability | Total | Grade |
|------|-------|-------------|----------|------------|------------|-------|-------|
| CSV Processing | Agent-A | 35 | 20 | 20 | 12 | 87 | B |
```

---

## Scoring Team Guidelines

1. **Do not score based on code style** — only correctness and behavior
2. **Accept creative solutions** — if it passes all tests and meets requirements, it's valid
3. **Human review for business logic** — automated tests don't catch semantic errors
4. **Re-run tests twice** — idempotency violations often appear on second run
5. **Check tool call log** — for autonomy assessment, not just final output

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-06-06 | Initial benchmark framework |