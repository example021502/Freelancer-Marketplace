import React, { createContext, useCallback, useEffect, useState } from "react";
import axios from "axios";
export const users_context = createContext(null);

function UsersDataContext({ children }) {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState(null);
  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/get/Users");
      setUsers(response.data);
    } catch (e) {
      console.log(`Error: Data fetchng failed...`);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  const postUsers = (newUser) => {
    axios
      .post("http://localhost:8080/api/add/Users", newUser)
      .then((res) => {
        const response = res.data;
        alert(response);
        fetchUsers();
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  };

  const create_user = (newUser) => {
    postUsers(newUser);
  };

  return (
    <users_context.Provider value={{ users, setUsers, create_user }}>
      {children}
    </users_context.Provider>
  );
}

export default UsersDataContext;
