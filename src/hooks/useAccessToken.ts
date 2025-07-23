// src/hooks/useAccessToken.ts
import { useAuth0 } from "@auth0/auth0-react";
import { useCallback } from "react";

export function useAccessToken() {
  const { getAccessTokenSilently } = useAuth0();

  // Reusable async function to get the token
  const getToken = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently();
      return token;
    } catch (err) {
      console.error("Failed to fetch access token:", err);
      throw err;
    }
  }, [getAccessTokenSilently]);

  return getToken;
}
