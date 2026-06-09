# Agent Product Benchmark — OpenClaw

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

## Overview

This benchmark evaluates autonomous AI agents on real-world product engineering tasks. Each task simulates a common workflow that software teams encounter daily: creating repositories, processing data, fixing bugs, and managing SaaS operations.

Agents are scored across four dimensions: **Autonomy**, **Tool Utilization**, **Accuracy**, and **Stability**. See [rubric/scoring.md](rubric/scoring.md) for the full scoring methodology.

## Task Categories

| Task | Description | Difficulty |
|---|---|---|
| [GitHub Repo Creation](tasks/github_repo_creation.md) | Create a public repo with specified structure and content | Medium |
| [CSV File Processing](tasks/csv_file_processing.md) | Read CSV, compute summary statistics, output JSON | Medium |
| [Node.js Bug Fix](tasks/node_bug_fix.md) | Diagnose and fix bugs in a sample Node.js project | Hard |
| [SaaS Refund Workflow](tasks/saas_refund_workflow.md) | Process refund: validate, prorate, issue, notify | Hard |
| [SaaS Billing Downgrade](tasks/saas_billing_downgrade.md) | Downgrade plan: check usage, schedule, adjust features | Hard |

## Scoring

See [rubric/scoring.md](rubric/scoring.md) for the detailed scoring rubric and formula.

## Results

See [results/summary.md](results/summary.md) for the latest benchmark results.

## Artifacts

The `artifacts/` directory contains test data used by the benchmark tasks:
- `sales_data.csv` — Sample sales data for CSV processing task
- `node_sample_project/` — Sample Node.js project with intentional bugs

## How to Run

1. Clone this repository
2. Review each task in `tasks/`
3. Point your agent at the task description and artifacts
4. Score the agent’s output using `rubric/scoring.md`
5. Record results in `results/summary.md`

## Contributing

1. Fork this repository
2. Add new tasks or improve existing ones
3. Submit a pull request

## License

MIT
