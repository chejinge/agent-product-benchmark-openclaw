# Case 1: GitHub Repository Creation

## Context

Your team needs to set up a new repository on GitHub to host a microservice. The repository must follow a standard layout with a README, a license, a `.gitignore`, and an initial feature branch.

## Objective

Create a **public** GitHub repository named `agent-product-benchmark-openclaw` under your GitHub account or organization. Populate it with the following structure and content:

```
/README.md
/rubric/scoring.md
/tasks/github_repo_creation.md
/tasks/csv_file_processing.md
/tasks/node_bug_fix.md
/tasks/saas_refund_workflow.md
/tasks/saas_billing_downgrade.md
/results/summary.md
/artifacts/
```

## Requirements

### Repository Setup
- Create repository via GitHub API (not the web UI)
- Set description: "Multi-dimensional AI agent benchmark suite"
- Make it public
- Initialize with empty README (content added in next step)

### File Content

**`/README.md`** — Project overview with structure, case table, evaluation dimensions, and instructions.

**`/rubric/scoring.md`** — Scoring framework (see rubric/scoring.md template).

**`/tasks/github_repo_creation.md`** — This file.

**`/tasks/csv_file_processing.md`** — Task spec for CSV processing case.

**`/tasks/node_bug_fix.md`** — Task spec for Node.js debug case.

**`/tasks/saas_refund_workflow.md`** — Task spec for SaaS refund workflow.

**`/tasks/saas_billing_downgrade.md`** — Task spec for billing downgrade workflow.

**`/results/summary.md`** — Results matrix with all TBD values (structure only, see template).

**`/artifacts/`** — Empty directory (placeholder for test data).

### Branching
- Create a branch named `feature/initial-setup` from `main`
- Commit all files to `feature/initial-setup`
- Create a Pull Request from `feature/initial-setup` → `main` (draft is fine)
- Title the PR: "feat: initialize benchmark repository structure"

## Constraints
- Do not use the GitHub web UI — use the API or CLI (`gh`)
- Do not commit placeholder content (e.g., "TBD" in actual docs, but TBD is allowed in results table)
- Repository must be created fresh; do not reuse existing repos
- Use your own credentials — never share tokens in logs or output

## Artifacts
- GitHub personal access token (PAT) with `repo` scope
- GitHub CLI (`gh`) installed, or use direct REST API via curl

## Success Criteria
1. Repository exists as a public GitHub repo
2. Default branch contains all 9 paths listed above
3. `feature/initial-setup` branch exists with a PR against `main`
4. README.md contains a case table with all 5 benchmark cases listed
5. `results/summary.md` exists with the TBD results table
6. No sensitive credentials appear in any commit or API call log

## Evaluation Dimensions
| Dimension | What to Observe |
|-----------|----------------|
| Autonomy | Did agent figure out API auth on its own? |
| Tool Usage | API calls vs. web UI workaround |
| Completeness | All 9 paths created, no missing files |
| Correctness | Branch/PR structure matches spec |
| Stability | No token exposure, idempotent rerun behavior |