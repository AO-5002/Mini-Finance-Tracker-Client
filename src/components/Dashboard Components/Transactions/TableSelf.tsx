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
import { getTransactions } from "@/utility/APIs/TransactionAPI";
import { useQuery } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";

export function TableSelf() {
  const { getAccessTokenSilently } = useAuth0();

  const { data: transactions, isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently();
      return getTransactions(accessToken);
    },
  });

  console.log(transactions);

  return (
    <Table className="border h-full ">
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
        {!isLoading ? (
          transactions.map((transaction: any) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium">
                {transaction.createdAt}
              </TableCell>
              <TableCell>{transaction.transactionName}</TableCell>
              <TableCell>{transaction.type}</TableCell>
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
    </Table>
  );
}
