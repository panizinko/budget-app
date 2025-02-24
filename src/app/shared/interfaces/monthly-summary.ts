export interface MonthlySummary {
  totalSpendingPLN: number;
  totalIncomePLN: number;
  topSpendingCategory: { category: string; amount: number };
  mostExpensiveTransaction: {
    category: string;
    amount: number;
    currency: string;
    convertedAmountPLN: number;
  };
  recurringExpensesPLN: number;
  transactionCount: number;
}
