import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import loadTransactionQueryOptions from "@/utility/QueryOptions/loadTransactionQueryOptions";
import { useState } from "react";
import { EditTransaction } from "./BtnComponents/EditTransaction";
import { type Transaction } from "@/utility/Schemas/Transaction";

interface QueryParams {
  sortBy?: string | undefined;
  order?: "ASC" | "DESC" | undefined;
}

export function TableSelf({ sortBy, order }: QueryParams) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<
    Transaction | undefined
  >();

  const { data: transactions, isPending } = useQuery(
    loadTransactionQueryOptions({ sortBy, order })
  );

  const handleRowClick = (transaction: any) => {
    setSelectedTransaction(transaction);
    setDialogOpen(true);
  };

  return (
    <Table className=" h-full ">
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader className="">
        <TableRow className="">
          <TableHead className="w-[100px]">Date</TableHead>
          <TableHead>Transaction Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="">
        {!isPending ? (
          transactions?.map((transaction) => (
            <TableRow
              key={transaction.id}
              className="text-xs font-light cursor-pointer"
              onClick={() => handleRowClick(transaction)}
            >
              <TableCell className="font-medium">
                {transaction.createdAt}
              </TableCell>
              <TableCell>{transaction.transactionName}</TableCell>
              <TableCell>
                {transaction.type.toLowerCase() === "expense" ? (
                  <span className="py-2 px-3 font-bold bg-red-400 rounded-lg text-red-100">
                    Expense
                  </span>
                ) : (
                  <span className="py-2 px-3 font-bold bg-green-400 rounded-lg text-green-100">
                    Income
                  </span>
                )}
              </TableCell>
              <TableCell className="text-right">{transaction.amount}</TableCell>
            </TableRow>
          ))
        ) : (
          <div>loading...</div>
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
      <EditTransaction
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        transaction={selectedTransaction}
        key={selectedTransaction?.id}
      />
    </Table>
  );
}
