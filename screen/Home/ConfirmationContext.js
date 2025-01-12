// ConfirmationContext.js
import React, { createContext, useState, useContext } from 'react';

const ConfirmationContext = createContext();

export const ConfirmationProvider = ({ children }) => {
  const [confirmation, setConfirmation] = useState(null);

  return (
    <ConfirmationContext.Provider value={{ confirmation, setConfirmation }}>
      {children}
    </ConfirmationContext.Provider>
  );
};

export const useConfirmation = () => useContext(ConfirmationContext);
