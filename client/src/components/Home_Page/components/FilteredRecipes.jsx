/* eslint-disable */
import React from 'react';
import axios from 'axios';
import SearchBar from './SearchBar.jsx';
import IngredientsList from './IngredientsList.jsx';
import FilteredList from './FilteredList.jsx';
import Recipe from './Recipes.jsx';

class FilteredRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      recipes: [],
      search: '',
      filter: []
    }

    this.fetchIngredients = this.fetchIngredients.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.deleteFilter = this.deleteFilter.bind(this);
    this.handleSearchButton = this.handleSearchButton.bind(this);

  }

  fetchIngredients(string) {
    axios.get(`/ingredients?query=${string}&token=${this.props.token}`)
      .then((success) => {
        this.setState ({
          ingredients: success.data
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  handleSearchChange(e) {
    if(e.target.value.length > 2) {
      this.fetchIngredients(e.target.value);
    }
  }

  addIngredient (e) {
    if(!this.state.filter.includes(e.target.innerText)) {
      this.state.filter.push(e.target.innerText);
      this.setState({
        filter: this.state.filter
      })
    }
  }

  deleteFilter (index) {
    this.state.filter.splice(index, 1)
    this.setState({
      filter: this.state.filter
    })
  }

  handleSearchButton (e) {
    e.preventDefault();
    var ingredients = this.state.filter.slice();
    axios.get(`/pantry?token=${this.props.token}`)
      .then((success) => {
        success.data
        for(var i = 0; i< success.data.length; i++) {
          ingredients.push(success.data[i].ingredient);
        }
        ingredients = ingredients.join(',');
        axios.get(`/filteredRecipes?ingredients=${ingredients}&token=${this.props.token}`)
          .then((success) => {
            this.setState({
              recipes: success.data
            })
          })
          .catch((err) => {
            console.log(err);
          })
      })
      .catch((err)=> {
        console.log(err);
        ingredients = ingredients.join(',');
        axios.get(`/filteredRecipes?ingredients=${ingredients}&token=${this.props.token}`)
          .then((success) => {
            this.setState({
              recipes: success.data
            })
          })
          .catch((err) => {
            console.log(err);
          })
      })
  }

  render() {
    return (
      <div className="filteredContainer">
        <div>
          <Recipe className="filteredRecipes" recipeList={this.state.recipes}/>
        </div>
        <div className="filter-list">
          <div className="top-half">
            <SearchBar className="search-bar" change={this.handleSearchChange}/>
            <IngredientsList list={this.state.ingredients} add={this.addIngredient}/>
          </div>
          <hr width={'68%'} align={'left'} color='#4F5902'></hr>
          <br></br>
          <div className="filter">FILTER</div>
          <button className="btn fill" type="button" onClick={this.handleSearchButton}>Search</button>
          <FilteredList list={this.state.filter} delete={this.deleteFilter}/>
        </div>
      </div>
    )
  }
}

export default FilteredRecipe;

