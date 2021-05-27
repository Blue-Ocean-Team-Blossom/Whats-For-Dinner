/* eslint-disable */
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { RecipeContext } from './RecipeContext';
import { PantryContext } from './PantryContext';
import { UserContext } from './UserContext';

export const APIContext = createContext({});

const APIProvider = ({ children }) => {
  const { setRecipe, clickedrecipe, setRecipeinfo } = useContext(RecipeContext);
  const { pantry, setPantry } = useContext(PantryContext);
  const { autocompOpts, setAutocompOpts } = useContext(PantryContext);
  const { userId, setUserId, token, setToken, username, setUsername } = useContext(UserContext);
  // remember to add useContext for UserContext

  /** *******************************FUNCTION CALLS GO HERE*********************************** */

  /******************************************User***********************************************/
  const createUser = (e) => {
    e.preventDefault();
    var user = {
      username: e.target[0].value,
      password: e.target[1].value
    };
    axios.post('/signup', user)
      .then((result) => {
        setUserId(result.data.user.id);
        setToken(result.data.user.token);
        setUsername(result.data.user.username);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const userLogin = (e) => {
    e.preventDefault();
    var user = {
      username: e.target[0].value,
      password: e.target[1].value
    };
    axios.post('/login', user)
      .then((result) => {
        setUserId(result.data.user.id);
        setToken(result.data.user.token);
        setUsername(result.data.user.username);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  /** **************************************Pantry******************************************** */
  const getPantry = async (userId) => {
    const pantryList = await axios.get(`/pantry?id=${userId}&token=${token}`);
    setPantry(pantryList.data);
  };

  const deleteFromPantry = async (id, userId) => {
    const deleteData = {
      deletion: {id: id},
      token: token
    }
    axios.delete(`/pantry`, {data: deleteData})
      .then(() => {
        getPantry(userId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateItem = async (id, userId, quantity) => {
    const updateData = {
      update: {
        pantryId: id,
        quantity: quantity
      },
      token: token
    }
    axios.put(`/pantry`, updateData)
      .then(() => {
        getPantry(userId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addToPantry = (e) => {
    e.preventDefault();
    const quantity = e.target[2].value;
    const itemData = autocompOpts[0];
    if (itemData.name === e.target[0].value) {
      console.log('IAN TEST ON ADDING PANTRY ITEM: ', e.target);
      console.log('IAN TEST ON ADDING PANTRY ITEM: ', autocompOpts);
      const pantryAddParse = { itemData, quantity, token };
      axios.post('/pantry', pantryAddParse)
        .then(() => getPantry(userId))
        .catch((err) => false);
    }
  };

  const autocomplete = async (e) => {
    e.preventDefault();
    const { value } = e.target;
    const options = { value };
    if (value.length > 2) {
      const result = await axios.post('/pantry/autocomplete', options)
        .then((success) => success.data)
        .catch((err) => {
          console.error(`Pantry autocomplete error: ${err}`);
          return false;
        });
      if (result) {
        setAutocompOpts(result);
      }
    }
  };

  /** **************************************************************************************** */

  /** *********************************RecipesByPantry******************************************* */

  const getRecipesByPantry = async () => {
    axios.get(`/RecipesByPantry?token=${token}`)
      .then((success) => {
        setRecipe(success.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /** **************************************************************************************** */

  /** *********************************RecipeById******************************************** */

  const getRecipeById = async (id) => {
    axios.get(`/Recipe/${id}?token=${token}`)
      .then((success) => {
        setRecipeinfo(success.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /** **************************************************************************************** */

  return (
    <APIContext.Provider value={{
      /* Include functions here */
      //User
      createUser,
      userLogin,
      // Pantry
      getPantry,
      deleteFromPantry,
      addToPantry,
      autocomplete,
      updateItem,
      // Recipes
      getRecipesByPantry,
      getRecipeById,
    }}
    >
      {children}
    </APIContext.Provider>
  );
};

export default APIProvider;
