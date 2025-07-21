import { z } from "zod";
type Transaction = {
  id: string;
  userId: string;
  amount: number;
  type: "income" | "expense";
  date: Date;
};

const TransactionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  amount: z.number().min(0),
  type: z.string(),
  date: z.date(),
});

export { type Transaction, TransactionSchema };
