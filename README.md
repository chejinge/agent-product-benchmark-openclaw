# Agent Benchmark — OpenClaw Edition

> Multi-dimensional evaluation framework for AI agent capabilities in real-world software engineering tasks.

---

## 📋 Overview

This benchmark evaluates AI agents across **5 realistic software engineering scenarios**, testing autonomy, tool usage, code correctness, and operational stability. Each case is self-contained with a `tasks/*.md` specification and accompanying artifacts.

---

## 🗂️ Project Structure

```
agent-product-benchmark-openclaw/
├── README.md                          ← This file
├── rubric/
│   └── scoring.md                    ← Scoring framework & formulas
├── tasks/
│   ├── github_repo_creation.md        ← Case 1: Repo & branch creation
│   ├── csv_file_processing.md        ← Case 2: Data processing
│   ├── node_bug_fix.md               ← Case 3: Debug & fix
│   ├── saas_refund_workflow.md       ← Case 4: Business workflow
│   └── saas_billing_downgrade.md      ← Case 5: Multi-step workflow
├── results/
│   └── summary.md                    ← Agent performance matrix
└── artifacts/
    ├── sample_sales.csv              ← Test data for CSV case
    └── node_bug_project.zip           ← Buggy Node.js project for debug case
```

---

## 📊 Benchmark Cases

| # | Case | Skills Tested | Difficulty |
|---|------|--------------|------------|
| 1 | GitHub Repo Creation | API usage, branching, idempotency | ⭐⭐ |
| 2 | CSV File Processing | Data parsing, transformation, I/O | ⭐⭐ |
| 3 | Node.js Bug Fix | Debugging, assertion analysis, fix | ⭐⭐⭐ |
| 4 | SaaS Refund Workflow | Business logic, API retry, idempotency | ⭐⭐⭐ |
| 5 | SaaS Billing Downgrade | Multi-step workflow, rollback, side effects | ⭐⭐⭐⭐ |

---

## 🧪 How to Run

### For Agent Evaluators

1. Provision a fresh agent session
2. Inject one `tasks/*.md` file as the sole instruction
3. Observe: tool calls, file changes, final output
4. Score using `rubric/scoring.md`
5. Record result in `results/summary.md`

### For Self-Assessment

```bash
# Clone this benchmark
git clone https://github.com/YOUR_ORG/agent-product-benchmark-openclaw.git
cd agent-product-benchmark-openclaw

# Run a specific case (example: Node.js Bug Fix)
cd artifacts
unzip node_bug_project.zip
cd node_bug_project
npm install
npm test
```

---

## 📐 Evaluation Dimensions

Each agent is scored on 4 dimensions (detailed in `rubric/scoring.md`):

| Dimension | Weight | Description |
|-----------|--------|-------------|
| **Autonomy** | 25% | Self-planning, error recovery, no premature asking |
| **Correctness** | 35% | Test pass rate, business logic accuracy |
| **Tool Usage** | 25% | Effective use of available tools & APIs |
| **Stability** | 15% | Idempotency, no crashes, predictable behavior |

---

## 📁 Task File Format

Each `tasks/*.md` follows this schema:

```markdown
# Task Title

## Context
Background information and project description.

## Objective
What the agent must accomplish.

## Constraints
- Do not modify `tests/` directory
- Do not hardcode expected outputs
- Must pass all assertions in the test suite

## Artifacts
Links or paths to test data, mock APIs, and supporting files.

## Success Criteria
Objective, verifiable outcomes.
```

---

## 🏆 Scoring Results

Current leaderboard is maintained in `results/summary.md`.

| Case | Best Performer | Score |
|------|---------------|-------|
| GitHub Creation | TBD | — |
| CSV File Processing | TBD | — |
| Node.js Bug Fix | TBD | — |
| SaaS Refund Workflow | TBD | — |
| SaaS Billing Downgrade | TBD | — |

---

## 🔧 Tool Call Tracking

All agent actions are captured for analysis. Use the `tool_call_log` annotation to reconstruct the agent's decision chain. Metrics include:

- Number of tool invocations
- Tool call sequence & timing
- File read/write ratio
- Error recovery path
- Autonomy score (questions asked vs. self-resolved)

---

## 📝 Contributing

To add a new benchmark case:
1. Create `tasks/your_case.md` with task specification
2. Add artifacts to `artifacts/` directory
3. Document scoring criteria in `rubric/scoring.md`
4. Update this README's case table

---

## License

MIT — Use freely for agent evaluation and research.