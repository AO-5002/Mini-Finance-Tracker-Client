// Transaction.ts
import { z } from "zod";

export const Transaction = z.object({
  id: z.string(),
  transactionName: z.string(),
  amount: z.number().min(0),
  type: z.string(),
  createdAt: z.string(), // keep as string if it comes from the API like that
});

export type TransactionSchema = z.infer<typeof Transaction>;
