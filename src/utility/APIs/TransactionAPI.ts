import axios from "axios";
import type { TransactionSchema } from "../Schemas/Transaction";

async function createTransaction(
  token: Promise<string>,
  newTransaction: Omit<TransactionSchema, "id" | "createdAt">
) {
  try {
    const resolvedToken = await token; // Await the token promise
    const response = await axios.post(
      "http://localhost:8080/transaction/private",
      newTransaction,
      {
        headers: {
          Authorization: `Bearer ${resolvedToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Transaction Saved: " + response);
  } catch (error: any) {
    if (error.response) {
      console.log("🔥 Server responded with an error:");
      console.log("Status:", error.response.status);
      console.log("Data:", error.response.data);
      console.log("Headers:", error.response.headers);
    } else if (error.request) {
      console.log("🕸️ Request made but no response received:");
      console.log("Request:", error.request);
    } else {
      console.log("🚨 Error setting up the request:");
      console.log("Message:", error.message);
    }

    throw error;
  }
}

async function getTransactions(token: string) {
  try {
    const response = await axios.get(
      "http://localhost:8080/transaction/private",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Success: " + response.data);
    return response.data;
  } catch (error) {
    console.log("You got bitched ma boii: " + error);
  }
}

export { getTransactions, createTransaction };
