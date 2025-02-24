export interface Transaction {
  id: string;
  author: string;
  created: string; // ISO string format of when the transaction was created
  date: string; // ISO string for the date of the transaction
  type: 'income' | 'expense';
  category: string;
  amount: number;
  currency: string; // Currency code (e.g., "USD", "EUR")
  description?: string;
  tags?: string[]; // Tags for better categorization (e.g., "groceries", "vacation")
  attachmentUrl?: string; // Optional URL for receipts or proof of transaction
  isRecurring?: boolean; // Whether the transaction repeats
  recurrence?: 'daily' | 'weekly' | 'monthly' | 'yearly'; // Frequency of recurrence
}
