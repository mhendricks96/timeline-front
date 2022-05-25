import axios from "axios";
import useSWR from "swr";

import { useAuth } from "../contexts/auth";
const baseUrl = process.env.REACT_APP_BACKEND;
export const apiUrl = baseUrl + "/api/friends/requests/";
export const acceptUrl = baseUrl + "/api/friends/accept_request/";
export const declineUrl = baseUrl + "/api/friends/reject_request/";

export default function useResourceRequests() {
  const { tokens, logout } = useAuth();

  const { data, error, mutate } = useSWR(
    [apiUrl, tokens],
    fetchResourceRequests
  );

  async function fetchResourceRequests(url: string) {
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

  async function createResourceRequests(info: any) {
    try {
      await axios.post(apiUrl, info, config());
      mutate(); // mutate causes complete collection to be refetched
    } catch (error) {
      handleError(error);
    }
  }

  async function acceptRequest(info: any) {
    try {
      let response = await axios.post(acceptUrl, info, config());
      mutate();
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async function declineRequest(info: any) {
    try {
      let response = await axios.post(declineUrl, info, config());
      mutate();
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
    resourcesRequests: data,
    error,
    loadingRequests: tokens && !error && !data,
    createResourceRequests,
    acceptRequest,
    declineRequest,
  };
}
