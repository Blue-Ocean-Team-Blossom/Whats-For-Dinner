import React, { createContext, useContext, useState } from 'react';

import sampleData from './sampleData/samplePantry';

export const PantryContext = createContext({});

const PantryProvider = ({ children }) => {
  const [autocompOpts, setAutocompOpts] = useState([]);
  const [itemInput, setItemInput] = useState('');
  const [pantry, setPantry] = useState([]);
  const [valid, setValid] = useState(true);

  return (
    <PantryContext.Provider
      value={{
        pantry,
        setPantry,
        autocompOpts,
        setAutocompOpts,
        itemInput,
        setItemInput,
        valid,
        setValid,
      }}
    >
      {children}
    </PantryContext.Provider>
  );
};

export default PantryProvider;
