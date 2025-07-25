import axios from "axios";
import { type Transaction, TransactionSchema } from "../Schemas/Transaction";

async function createTransaction(
  token: Promise<string>,
  newTransaction: Omit<Transaction, "id" | "createdAt">
) {
  try {
    const validTransaction = TransactionSchema.omit({
      id: true,
      createdAt: true,
    }).safeParse(newTransaction);
    const resolvedToken = await token; // Await the token promise
    if (validTransaction.success) {
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
    } else {
      let zodErrors = {};
      validTransaction.error.issues.forEach((issue) => {
        zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
      });

      // ✅ Create error message from the zodErrors object
      const errorMessages = Object.entries(zodErrors)
        .map(([field, message]) => `${field}: ${message}`)
        .join(", ");

      throw new Error(`Validation failed: ${errorMessages}`);
    }
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
