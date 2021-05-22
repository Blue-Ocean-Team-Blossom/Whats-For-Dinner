/* eslint-disable */
import React, { useEffect, useContext, useState } from 'react';
import FilteredRecipe from './components/FilteredRecipes';
import Recipe from './components/Recipes';
import { PantryContext } from '../../state_&_contexts/PantryContext';
import { RecipeContext } from '../../state_&_contexts/RecipeContext';
import { APIContext } from '../../state_&_contexts/APIContext';
import axios from 'axios';

const Home = () => {
  const { pantry } = useContext(PantryContext);
  const { recipe } = useContext(RecipeContext);
  const { getPantry } = useContext(APIContext);

  useEffect(() => {
    getPantry();
    // getRecipesByPantry();
  }, [])

  let pantrylist = '';

  return (
    <div>
      <h1>This is the Home Page</h1>
      <FilteredRecipe />
      <Recipe recipeList={recipe}/>
    </div>
  )
};

export default Home;
