/* eslint-disable */
import React from 'react';
import APIProvider from './APIContext';
import RecipeProvider from './RecipeContext';
import PantryProvider from './PantryContext';
import UserProvider from './UserContext';

export const RootProvider = ({ children }) => (
  <UserProvider>
    <PantryProvider>
      <RecipeProvider>
        <APIProvider>
          { children }
        </APIProvider>
      </RecipeProvider>
    </PantryProvider>
  </UserProvider>
);
