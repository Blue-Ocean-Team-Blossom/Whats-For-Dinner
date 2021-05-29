import React, { useEffect, useContext, useState } from 'react';
import { APIContext } from '../../state_&_contexts/APIContext';
import { PantryContext } from '../../state_&_contexts/PantryContext';

const PantryForm = () => {
  const { addToPantry, autocomplete } = useContext(APIContext);
  const {
    autocompOpts, itemInput, setItemInput,
  } = useContext(PantryContext);
  return (
    <form id="pantryForm" onSubmit={(e) => addToPantry(e)}>
      <label htmlFor="pantryFormItem">
        Item:
        <br />
        <input
          type="text"
          list="pantryInputSelect"
          id="pantryFormItem"
          name="pantryFormItem"
          placeholder="item to add"
          required
          onChange={(e) => {
            autocomplete(e);
            setItemInput(e.target.value);
          }}
        />
        <datalist id="pantryInputSelect">
          {autocompOpts.map((option) => (
            <option key={option.id} data={option} value={option.name}>
              {option.name}
            </option>
          ))}
        </datalist>
      </label>
      <label htmlFor="pantryFormUnit">
        Unit:
        <br />
        <input type="text" list="pantryInputSelect2" id="pantryFormUnit" name="pantryFormUnit" placeholder="unit" required />
        <datalist id="pantryInputSelect2">
          {
            autocompOpts.filter((item) => item.name === itemInput)[0]
            && autocompOpts.filter((item) => item.name === itemInput)[0].possibleUnits
              .map((unit, idx) => <option key={`${unit} ${idx}`}>{unit}</option>)
          }
        </datalist>
      </label>
      <label htmlFor="pantryFormQuantity">
        Quantity:
        <br />
        <input type="number" id="pantryFormQuantity" name="pantryFormQuantity" placeholder="greater than zero" step="0.01" min="0.01" required />
      </label>
      <button type="submit" id="pantryFormSubmit">Submit</button>
    </form>
  );
};

export default PantryForm;
