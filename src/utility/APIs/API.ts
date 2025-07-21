import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const { user, getAccessTokenSilently } = useAuth0();

// Fetch public message (no auth needed)
async function fetchPublicMessage() {
  try {
    const response = await axios.get("http://localhost:8080/api/public");
    console.log("Public API response:", response.data);
  } catch (error) {
    console.error("Error fetching public message:", error);
  }
}

async function callProtected() {
  try {
    const token = await getAccessTokenSilently();
    console.log(token);
    const response = await axios.get("http://localhost:8080/api/private", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // You can use the token here to call your protected API
    console.log("Private Token:", response.data);
  } catch (e) {
    console.log("Error: " + e);
  }
}

async function callScopedMessages() {
  try {
    const token = await getAccessTokenSilently();
    const response = await axios.get(
      "http://localhost:8080/api/private-scoped",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          scope: "read:messages",
        },
      }
    );
    console.log("Scoped Messages API response:", response.data);
  } catch (error) {
    console.error("Error calling scoped messages API:", error);
    if (axios.isAxiosError(error)) {
      console.error("Response status:", error.response?.status);
      console.error("Response data:", error.response?.data);
    }
  }
}

async function createUser() {
  try {
    const token = await getAccessTokenSilently();

    // Prepare user data from Auth0 info
    const userData = {
      name: user?.name,
      email: user?.email,
    };

    const response = await axios.post(
      "http://localhost:8080/user/private",
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("User created or fetched:", response.data);
  } catch (e) {
    console.error("Error creating user:", e);
  }
}
