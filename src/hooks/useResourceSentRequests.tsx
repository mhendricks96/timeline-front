import axios from "axios";
import useSWR from "swr";

import { useAuth } from "../contexts/auth";
const baseUrl = process.env.REACT_APP_BACKEND;
export const apiUrl = baseUrl + "/api/friends/sent_requests/";
export const createUrl = baseUrl + "/api/friends/add_friend/";

export default function useResourceSentRequests() {
  const { tokens, logout } = useAuth();

  const { data, error, mutate } = useSWR(
    [apiUrl, tokens],
    fetchResourceSentRequests
  );

  async function fetchResourceSentRequests(url: string) {
    if (!tokens) {
      return;
    }

    try {
      const response = await axios.get(url, config());

      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async function createResourceSentRequests(info: any) {
    try {
      let response = await axios.post(createUrl, info, config());
      mutate(); // mutate causes complete collection to be refetched
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  // helper function to handle getting Authorization headers EXACTLY right
  function config() {
    return {
      headers: {
        Authorization: "Bearer " + tokens.access,
      },
    };
  }

  function handleError(error: unknown) {
    console.error(error);
    // currently just log out on error
    logout();
  }

  return {
    resourcesSentRequests: data,
    error,
    loadingSentRequests: tokens && !error && !data,
    createResourceSentRequests,
  };
}
