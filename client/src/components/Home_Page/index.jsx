/* eslint-disable */
import React, { useEffect, useContext, useState } from 'react';
import FilteredRecipe from './components/FilteredRecipes';
import Recipe from './components/Recipes';

import { RecipeContext } from '../../state_&_contexts/RecipeContext';
import { APIContext } from '../../state_&_contexts/APIContext';
import { UserContext } from '../../state_&_contexts/UserContext';

const Home = () => {
  const { recipe, showpantryrecipes } = useContext(RecipeContext);
  const { getRecipesByPantry } = useContext(APIContext);
  const { token } = useContext(UserContext);

  useEffect(() => {
    getRecipesByPantry();
  }, [])

  return (
    <div>
      <br></br>
      {showpantryrecipes ?
        <Recipe recipeList={recipe}/>
      : <FilteredRecipe token={token}/>}
    </div>
  )
};

export default Home;
