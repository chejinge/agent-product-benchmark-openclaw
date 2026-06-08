# Agent Product Benchmark — OpenClaw

> A structured benchmark for evaluating AI Agent capabilities across autonomy, tool utilization, and stability.

## Overview

This repository defines a multi-case benchmark suite designed to test how well an AI Agent can:

- **Autonomously** navigate complex, multi-step tasks without excessive human guidance
- **Utilize tools** effectively (API calls, file I/O, shell commands, browser automation)
- **Maintain stability** under edge cases, errors, and rollback scenarios

## Benchmark Cases

| # | Case | Domain | Key Skills Tested |
|---|------|--------|-------------------|
| 1 | GitHub Repo Creation | DevOps / API | REST API usage, repo initialization, README authoring |
| 2 | CSV File Processing | Data / Logic | Data quality checks, computed columns, anomaly detection |
| 3 | Node.js Bug Fix | Code / Debugging | Multi-file bug detection, test-driven fixing |
| 4 | SaaS Refund Workflow | Business Logic | Prorated refund calculation, rollback, idempotency |
| 5 | SaaS Billing Downgrade | Business Logic | Full workflow: validation → refund → downgrade → rollback → audit → email |

## Repository Structure

```
/
├── README.md                    ← This file
├── rubric/
│   └── scoring.md               ← Scoring formula & evaluation criteria
├── tasks/
│   ├── github_repo_creation.md  ← Task 1: Create a public GitHub repo
│   ├── csv_file_processing.md   ← Task 2: Process & analyze CSV data
│   ├── node_bug_fix.md          ← Task 3: Fix bugs in a Node.js project
│   ├── saas_refund_workflow.md  ← Task 4: Implement refund workflow
│   ├── saas_billing_downgrade.md← Task 5: Full billing downgrade pipeline
├── results/
│   └── summary.md               ← Cross-agent comparison results
├── artifacts/
│   ├── sales_data_agent_benchmark.csv  ← Sample CSV for Task 2
│   ├── agent_code_benchmark_advanced.zip ← Sample Node.js project for Task 3
│   └── saas_billing_downgrade_benchmark.zip ← SaaS billing project for Task 5
```

## Scoring

See [`rubric/scoring.md`](rubric/scoring.md) for the full evaluation framework.

Each case is scored on three dimensions:

| Dimension | Weight | Description |
|-----------|--------|-------------|
| Autonomy | 40% | How much the agent accomplishes without human intervention |
| Tool Utilization | 30% | Correctness and efficiency of tool/API usage |
| Stability | 30% | Handling of edge cases, errors, rollback, idempotency |

## How to Run

1. Provide the task description and artifacts to the Agent
2. Record all tool calls, decisions, and outputs
3. Score each case using the rubric
4. Aggregate into `results/summary.md`

## License

MIT