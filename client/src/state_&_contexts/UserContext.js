import React, { createContext, useContext, useState } from 'react';

export const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(0);
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');

  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId,
        token,
        setToken,
        username,
        setUsername,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
