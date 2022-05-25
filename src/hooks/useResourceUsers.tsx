import axios from "axios";
import useSWR from "swr";

import { useAuth } from "../contexts/auth";
const baseUrl = process.env.REACT_APP_BACKEND;
export const apiUrl = baseUrl + "/api/events/users/";
export const createUrl = baseUrl + "/api/events/create_user/";

export default function useResourceUsers() {
  const { tokens, logout, login } = useAuth();

  const { data, error, mutate } = useSWR([apiUrl, tokens], fetchResourceUsers);

  async function fetchResourceUsers(url: string) {
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

  async function createResourceUsers(info: any) {
    try {
      let response = await axios.post(createUrl, info);
      //logging in with the user just created
      await login(info.username, info.password);
      mutate(); // mutate causes complete collection to be refetched
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  // async function deleteResourceUsers(id: string) {
  //   try {
  //     const url = apiUrl + id;
  //     await axios.delete(url, config());
  //     mutate(); // mutate causes complete collection to be refetched
  //   } catch (error) {
  //     handleError(error);
  //   }
  // }

  // async function updateResourceUsers(resource: any) {
  //   // Add ability for user to update an existing resource
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
    resourcesUsers: data,
    error,
    loadingUsers: tokens && !error && !data,
    createResourceUsers,
    // deleteResourceUsers,
    // updateResourceUsers,
  };
}
