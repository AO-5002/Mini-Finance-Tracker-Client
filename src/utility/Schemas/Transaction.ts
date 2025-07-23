import { z } from "zod";
type Transaction = {
  transactionName: string;
  amount: number;
  type: "income" | "expense";
};

const TransactionSchema = z.object({
  transactionName: z.string(),
  amount: z.number().min(0),
  type: z.string(),
});

export { type Transaction, TransactionSchema };
