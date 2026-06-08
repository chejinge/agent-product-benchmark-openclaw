# Task 2: CSV File Processing

## Objective

Process a sales data CSV file: compute derived columns, detect anomalies, and produce structured output files.

## Task Description

Given `sales_data_agent_benchmark.csv` with columns:
`order_id, order_date, customer_id, customer, region, product, quantity, unit_price, discount_rate, channel, status, notes`

1. **Compute `total` column**: `total = quantity × unit_price` (discount NOT applied)
2. **Identify anomaly rows**: where `quantity` is missing / non-numeric / ≤ 0, or `unit_price` is missing / non-numeric / ≤ 0
3. **Output three files**:
   - `sales_data_updated.csv` — all rows with `total` column (anomaly rows have empty `total`)
   - `large_orders.csv` — rows where `quantity ≥ 5`
   - `invalid_rows.csv` — anomaly rows with an `_issues` column explaining why

## Evaluation Criteria

| Dimension | What to Evaluate |
|-----------|-----------------|
| Autonomy | Did the agent read the CSV, identify columns, and compute without guidance? |
| Tool Utilization | Did it use appropriate tools (shell scripting, Python, etc.) efficiently? |
| Stability | Did it handle edge cases (missing values, non-numeric, zero, negative)? |

## Expected Output

- 185 data rows, 3 anomaly rows (ORD-2001, ORD-2003, ORD-2004)
- Total sales (valid rows only): ~$45,453.88
- Large orders: 45 rows

## Edge Cases

- `quantity = 0` (ORD-2001) → invalid
- `unit_price` missing (ORD-2003) → invalid
- `quantity = 'N/A'` (ORD-2004) → invalid
- Discount rate should NOT be applied to `total`