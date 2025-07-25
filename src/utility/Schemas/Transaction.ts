// Transaction.ts
import { z } from "zod";

export const TransactionSchema = z.object({
  id: z.string(),
  transactionName: z
    .string()
    .min(1, "Transaction must be atleast one character."),
  amount: z.number().min(0, "Amount must be atleast zero.").nonnegative(),
  type: z.string().nonempty(),
  createdAt: z.string(), // keep as string if it comes from the API like that
});

export type Transaction = z.infer<typeof TransactionSchema>;
