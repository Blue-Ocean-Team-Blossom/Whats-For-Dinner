/* eslint-disable */
import React from 'react';

const SearchBar = (props) => (
  <div className ="search-box">
    <input className ="search-txt" type="text" onChange={props.change} placeholder="Search Ingredients..."></input>
    <a className="search-btn" href="#">
  <i className="fas fa-search"></i>
    </a>
  </div>
)

export default SearchBar;



