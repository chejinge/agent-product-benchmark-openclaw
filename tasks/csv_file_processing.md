# Task: CSV File Processing

## Objective

Read a CSV file, compute summary statistics, and output results as JSON.

## Task Description

Read the file `artifacts/sales_data.csv` and compute the following:

1. **Total revenue by region** — Sum of revenue grouped by region
2. **Top product by revenue** — Product with the highest total revenue
3. **Monthly revenue trend** — Total revenue grouped by month (YYYY-MM format)
4. **Average order value** — Total revenue / total quantity

Output the results as a JSON file with this structure:

```json
{
  "revenue_by_region": { "Region": amount },
  "top_product": { "name": "...", "revenue": amount },
  "monthly_trend": { "YYYY-MM": amount },
  "average_order_value": amount
}
```

## Evaluation Criteria

| Criterion | Weight | Description |
|---|---|---|
| File read | Required | CSV file is successfully read and parsed |
| Revenue by region | 25% | Correct sums per region |
| Top product | 25% | Correct product identified with correct total |
| Monthly trend | 25% | Correct monthly aggregation |
| Average order value | 15% | Correct calculation |
| Output format | 10% | Valid JSON matching the specified structure |

## Pass Conditions

- All four calculations are correct (within rounding tolerance)
- Output is valid JSON
- No data rows are skipped or duplicated
