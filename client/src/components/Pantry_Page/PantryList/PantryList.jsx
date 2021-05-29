/* eslint-disable */
import React, { useEffect, useContext, useState } from 'react';
import PantryItem from './PantryItem';
import { PantryContext } from '../../../state_&_contexts/PantryContext';
import { APIContext } from '../../../state_&_contexts/APIContext';
import { UserContext } from '../../../state_&_contexts/UserContext';


const PantryList = () => {
  const { pantry, setPantry } = useContext(PantryContext);
  const { getPantry, deleteFromPantry } = useContext(APIContext);
  const { userId } = useContext(UserContext);

  useEffect(() => {
    getPantry(userId);
  }, []);

  if (pantry.length > 0) {
    var pantryList = pantry.slice();
  } else {
    var pantryList = [];
  }

  return (
    <div id='pantryList'>
      <h1>Your Current Pantry</h1><br/>
      {pantryList.length > 0
        ? <div id='pantryFeed'>
            <div id='pantryListHeader'>
              <h2>Item</h2>
              <h2>Quantity</h2>
              <h2>Unit</h2>
            </div>
            <div id='pantryFeedItems'>
                {pantryList.map(item =>
                  <PantryItem key={item.id} item={item} delete={deleteFromPantry}/>
                )}
            </div>
          </div>
        : <h3>Add an item to your pantry</h3>
      }
    </div>
  );
}

export default PantryList;

