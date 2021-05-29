/* eslint-disable */
import React, { createContext, useContext, useState } from 'react';

export const RecipeContext = createContext({});

const RecipeProvider = ({ children }) => {
  const [recipe, setRecipe] = useState([]);
  const [filteredrecipe, setFilteredrecipe] = useState([]);
  const [recipeinfo, setRecipeinfo] = useState({});
  const [showpantryrecipes, setShowpantryrecipes] = useState(true);

  return (
    <RecipeContext.Provider
      value={{
        recipe,
        setRecipe,
        filteredrecipe,
        setFilteredrecipe,
        recipeinfo,
        setRecipeinfo,
        showpantryrecipes,
        setShowpantryrecipes,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeProvider;
