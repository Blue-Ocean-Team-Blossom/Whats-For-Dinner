/* eslint-disable */
import React, {useState, useContext} from 'react';
import $ from 'jquery';

import { APIContext } from '../../../state_&_contexts/APIContext';
import { UserContext } from '../../../state_&_contexts/UserContext';


const PantryItem = (props) => {
  const {updateItem} = useContext(APIContext);
  const {userId} = useContext(UserContext);

  const [showUpdate, setShowUpdate] = useState(false);

  var item = props.item;
  var deleteFunc = props.delete;
  var itemName = item.ingredient.substring(0, 1).toUpperCase() + item.ingredient.substring(1).toLowerCase();
  var quantity = item.quantity ? item.quantity : 1;

  var openUpdate = () => {
    setShowUpdate(true);
  }

  var closeUpdate = () => {
    setShowUpdate(false);
  }

  var update = (id, userId, change) => {
    if (change.length > 0 || !isNaN(parseInt(change))) {
      if (parseInt(change) === 0) {
        deleteFunc(id, userId);
      } else {
        updateItem(id, userId, parseInt(change));
      }
    }
    closeUpdate();
  }

  var add = (id, userId, change, current) => {
    if (change.length > 0 || !isNaN(parseInt(change))) {
      var newQuantity = parseInt(current) + parseInt(change);
    } else {
      var newQuantity = parseInt(current) + 1;
    }
    updateItem(id, userId, newQuantity);
    closeUpdate();
  }

  var subtract = (id, userId, change, current) => {
    if (change.length > 0 || !isNaN(parseInt(change))) {
      var newQuantity = parseInt(current) - parseInt(change);
    } else {
      var newQuantity = parseInt(current) - 1;
    }

    if (newQuantity > 0) {
      updateItem(id, userId, newQuantity);
    } else {
      deleteFunc(id, userId);
    }
    closeUpdate();
  }

  return (
    <div id='pantryItem'>
      <h3>{itemName}</h3>
      {showUpdate
        ? <div id='updateField'>
            <input type='text' id='updateQuantity' placeholder='Quantity'/>
            <div>
              <button onClick={() => add(item.id, userId, $('#updateQuantity').val(), quantity)}> + </button>
              <button onClick={() => subtract(item.id, userId, $('#updateQuantity').val(), quantity)}> - </button>
              <button onClick={() => update(item.id, userId, $('#updateQuantity').val())}>Update</button>
              <button onClick={() => closeUpdate()}>X</button>
            </div>
          </div>
        : <h3>{quantity}</h3>
      }
      <h3>{item.units}</h3>
      <div id='itemButtons'>
        <button onClick={() => {openUpdate()}}>Update Quantity</button>
        <button onClick={() => {deleteFunc(item.id, userId)}}>Delete Item</button>
      </div>
    </div>
  );
}

export default PantryItem;
