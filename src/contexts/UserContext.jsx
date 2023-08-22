import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { USERSAPI } from "../utils/consts";
import { notify } from "../components/Toastify";

const userContext = createContext();
export const useUserContext = () => useContext(userContext);

const UserContext = ({ children }) => {
  const [users, setUsers] = useState([]);

  async function getUser() {
    try {
      const { data } = await axios.get(USERSAPI);
      setUsers(data);
    } catch (error) {
      notify(`${error.response.status}: ${error.response.statusText}`, "error");
    }
  }

  async function addUser(newUser) {
    try {
      await axios.post(USERSAPI, newUser);
      getUser();
    } catch (error) {
      notify(`${error.response.status}: ${error.response.statusText}`, "error");
    }
  }

  const value = {
    users,
    getUser,
    addUser,
  };
  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};

export default UserContext;
