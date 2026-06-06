# Case 2: CSV File Processing

## Context

A sales team has exported their Q1 data as a raw CSV. The data contains dirty entries: missing values, duplicate rows, and a column with inconsistent formatting. Your job is to clean and transform this data, then produce a summary report.

## Objective

Process `artifacts/sample_sales.csv` and produce:
1. A cleaned CSV saved to `output/cleaned_sales.csv`
2. A summary JSON saved to `output/summary.json`

## Input File Format (`sample_sales.csv`)

```csv
order_id,date,product,quantity,unit_price,discount_rate,customer_id,region
ORD-001,2026-01-03,Widget A,2,100,0.1,C-100,North
ORD-002,2026-01-05,Widget B,1,50,0,,South
ORD-001,2026-01-03,Widget A,2,100,0.1,C-100,North  ← duplicate
ORD-003,,Widget C,3,80,0,C-200,East
ORD-004,2026-01-10,Widget A,1.5,100,0.2,C-101,West
ORD-005,2026-01-11,Widget B,2,50,0,C-102,North
```

## Cleaning Rules

1. **Remove duplicates** — Rows with identical `order_id` must appear only once (keep first occurrence)
2. **Fill missing dates** — If `date` is empty, use the previous row's date
3. **Reject invalid quantity** — If `quantity` is not a positive integer, skip the row and log it
4. **Handle missing customer_id** — If `customer_id` is empty, replace with `"UNKNOWN"`
5. **Round discount_rate** — Round to 4 decimal places

## Output Specifications

### `output/cleaned_sales.csv`
Same column headers as input. No duplicates, no invalid rows, missing values handled.

### `output/summary.json`
```json
{
  "total_orders": <int>,
  "unique_customers": <int>,
  "total_revenue": <float, 2 decimals>,
  "revenue_by_region": {
    "North": <float>,
    "South": <float>,
    "East": <float>,
    "West": <float>
  },
  "rejected_rows": [
    { "order_id": "...", "reason": "..." }
  ],
  "duplicate_rows_removed": <int>
}
```

Revenue formula: `sum(quantity * unit_price * (1 - discount_rate))`, rounded to 2 decimals.

## Constraints
- Do not hardcode expected output values
- All computation must be derived from the input data
- Rejected rows must be logged with reasons, not silently dropped
- Use only Node.js standard library (no external packages)

## Artifacts
- `artifacts/sample_sales.csv` — Input data file with dirty entries

## Success Criteria
1. `output/cleaned_sales.csv` exists with correct cleaned data
2. `output/summary.json` exists with valid statistics
3. No duplicate `order_id` values in cleaned CSV
4. `rejected_rows` array documents every skipped row with reason
5. Revenue formula is correctly applied (discount reduces price, not increases)
6. Node.js script runs without errors

## Evaluation Dimensions
| Dimension | What to Observe |
|-----------|----------------|
| Autonomy | Did agent self-discover data issues before asking? |
| Data Logic | Correct deduplication, missing-value handling, revenue formula |
| Tool Usage | File I/O, data transformation approach |
| Completeness | All 5 cleaning rules implemented |
| Stability | Handles edge cases (all missing fields, etc.) |