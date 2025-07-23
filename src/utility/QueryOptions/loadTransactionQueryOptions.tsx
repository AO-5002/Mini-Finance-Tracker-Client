import { queryOptions } from "@tanstack/react-query";
import { getTransactions } from "../APIs/TransactionAPI";
import { type TransactionSchema } from "../Schemas/Transaction";
import { useAuth0 } from "@auth0/auth0-react";

export default function loadTransactionQueryOptions() {
  const { getAccessTokenSilently } = useAuth0();
  return queryOptions({
    queryKey: ["transactions"],
    queryFn: async (): Promise<TransactionSchema[]> => {
      const accessToken = await getAccessTokenSilently();
      return getTransactions(accessToken);
    },
  });
}
