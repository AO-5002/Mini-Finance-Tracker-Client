import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
const { user, getAccessTokenSilently } = useAuth0();

async function saveTransaction() {
  try {
    const token = await getAccessTokenSilently();
    console.log("Token:", token);
    const transactionData = {
      transactionName: "First Transaction",
      amount: 100,
      type: "expense",
    };
    const response = await axios.post(
      "http://localhost:8080/transaction/private",
      transactionData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
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
  }
}

async function getTransactions() {
  try {
    const token = await getAccessTokenSilently();

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
