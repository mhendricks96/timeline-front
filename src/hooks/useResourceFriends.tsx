import axios from "axios";
import useSWR from "swr";

import { useAuth } from "../contexts/auth";
const baseUrl = process.env.REACT_APP_BACKEND;
export const apiUrl = baseUrl + "/api/friends/";

export default function useResourceFriends() {
  const { tokens, logout } = useAuth();

  const { data, error, mutate } = useSWR(
    [apiUrl, tokens],
    fetchResourceFriends
  );

  async function fetchResourceFriends(url: string) {
    if (!tokens) {
      return;
    }

    try {
      const response = await axios.get(url, config());
      localStorage.setItem("friends", JSON.stringify(response.data));

      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async function createResourceFriends(info: any) {
    try {
      await axios.post(apiUrl, info, config());
      mutate(); // mutate causes complete collection to be refetched
    } catch (error) {
      handleError(error);
    }
  }

  // async function deleteResourceFriends(id: string) {
  //   try {
  //     const url = apiUrl + id;
  //     await axios.delete(url, config());
  //     mutate(); // mutate causes complete collection to be refetched
  //   } catch (error) {
  //     handleError(error);
  //   }
  // }

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
    resourcesFriends: data,
    error,
    loadingFriends: tokens && !error && !data,
    createResourceFriends,
    // deleteResourceFriends,
  };
}
