import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  useAuthHeader,
  useIsAuthenticated,
  useSignIn,
  useSignOut,
} from "react-auth-kit";

function HandleError(error) {
  let message;
  if (error instanceof Error) {
    message = error.message;
    if (error.name === "AxiosError") {
      if (error.response.status === 401) {
        console.log("ERROR:", error.response.status);
        Signout();
      }
    }
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Unknown Error";
  }

  return message;
}

export function useAxios(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const Signin = useSignIn();
  const Signout = useSignOut();

  const isAuthorised = useIsAuthenticated();

  if (!isAuthorised()) {
    return Signin();
  }
  const token = useAuthHeader();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(url, {
          headers: {
            Authorization: token(),
          },
        });
        setData(response.data);
      } catch (error) {
        setError(error);

        if (error.name === "AxiosError") {
          if (error.response.status === 401) {
            console.log("ERROR:", error.response.status);
            alert("Not Authorised");

            Signout();
          }
        }
      } finally {
        setLoading(false);
      }
    };

    if (!isAuthorised()) {
      Signin();
    } else {
      fetchData();
    }
  }, [url]);

  return { data, loading, error };
}

export function useMutation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isAuthorised = useIsAuthenticated();
  if (!isAuthorised()) {
    return Signin();
  }
  const Signin = useSignIn();
  const token = useAuthHeader();

  const executeMutation = async (url, payload, config = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(url, payload, {
        headers: {
          Authorization: token(),
        },
      });
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err);
      if (error.name === "AxiosError") {
        if (error.response.status === 401) {
          console.log("ERROR:", error.response.status);
          Signout();
        }
      }
      setLoading(false);
      throw err; // Rethrow the error for the caller to handle if needed
    }
  };

  const updateMutation = async (url, payload, config = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(url, payload, {
        headers: {
          Authorization: token(),
          "Content-Type": "application/json",
        },
      });
      setLoading(false);
      return response.data;
    } catch (err) {
      const Error = HandleError(err);
      setError(Error);
      setLoading(false);
      throw Error;
    }
  };

  return { executeMutation, updateMutation, loading, error };
}
