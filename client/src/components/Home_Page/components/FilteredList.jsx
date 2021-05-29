/* eslint-disable */
import React from 'react';

const FilteredList = (props) => {
  const list = props.list.map((ingredient, i) =>
    <div className="filterIngredient" key={i} onClick={() => props.delete(i)}>
      {ingredient}
      {/* <a className="filterclose"></a> */}
    </div>
  );
  return (
    <div className="filterIngredientList">
      {list}
    </div>
  );
};

export default FilteredList;
