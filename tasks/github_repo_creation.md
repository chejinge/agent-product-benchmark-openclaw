# Task 1: GitHub Repository Creation

## Objective

Create a public GitHub repository with a specific structure and content, demonstrating API-based DevOps capability.

## Task Description

1. Create a **public** GitHub repository named `agent-benchmark-682`
2. Initialize with a `README.md` containing:
   ```markdown
   # Agent Benchmark Test

   Created by AI Agent.
   ```
3. Verify the repository is accessible and public

## Evaluation Criteria

| Dimension | What to Evaluate |
|-----------|-----------------|
| Autonomy | Did the agent create the repo without asking for credentials? Did it handle the "repo already exists" error? |
| Tool Utilization | Did it use GitHub REST API correctly? Did it handle authentication properly? |
| Stability | Did it verify the repo is public? Did it handle API rate limits or errors? |

## Expected Output

- Repository URL: `https://github.com/<username>/agent-benchmark-682`
- README.md with specified content
- Repository visibility: public

## Edge Cases to Test

- Repository name already exists → should handle gracefully
- API rate limiting → should retry or report
- Authentication failure → should not expose token