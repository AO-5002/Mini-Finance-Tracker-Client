import { queryOptions } from "@tanstack/react-query";
import { getTransactions } from "../APIs/TransactionAPI";
import { type Transaction } from "../Schemas/Transaction";
import { useAuth0 } from "@auth0/auth0-react";

interface QueryParams {
  sortBy?: string | undefined;
  order?: "ASC" | "DESC" | undefined;
}

export default function loadTransactionQueryOptions({
  sortBy,
  order,
}: QueryParams = {}) {
  const { getAccessTokenSilently } = useAuth0();
  return queryOptions({
    queryKey: ["transactions", { sortBy, order }],
    queryFn: async (): Promise<Transaction[]> => {
      const accessToken = await getAccessTokenSilently();
      return getTransactions(accessToken, sortBy, order?.toLowerCase());
    },
  });
}
