import React, { createContext, useContext, useState, useEffect } from "react";

const AddressContext = createContext();

export const useAddress = () => useContext(AddressContext);

export const AddressProvider = ({ children }) => {

  const [address, setAddress] = useState(() => {
    const saved = localStorage.getItem("address");
    return saved ? JSON.parse(saved) : "";
  });

  useEffect(() => {
    localStorage.setItem("address", JSON.stringify(address));
  }, [address]);

  return (
    <AddressContext.Provider value={{ address, setAddress }}>
      {children}
    </AddressContext.Provider>
  );
};