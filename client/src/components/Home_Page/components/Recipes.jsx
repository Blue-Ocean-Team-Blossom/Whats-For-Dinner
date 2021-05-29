/* eslint-disable */
import React, { useEffect, useContext, useState } from 'react';
import { RecipeContext } from '../../../state_&_contexts/RecipeContext';
import { APIContext } from '../../../state_&_contexts/APIContext';
import parse from 'html-react-parser';
import InfiniteScroll from 'react-infinite-scroll-component';

const Recipe = (props) => {
  const { recipeinfo, showpantryrecipes } = useContext(RecipeContext);
  const { getRecipeById } = useContext(APIContext);

  const [showdetails, setShowdetails] = useState(false);
  const [items, setItems] = useState([]);
  const [hasmore, setHasmore] = useState(true);
  const [count, setCount] = useState(4);

  useEffect(() => {
    if (props.recipeList.length > 0) {
      setItems(props.recipeList.slice(0, count));
    }
  }, [props.recipeList]);

  const onClick = (e) => {
    e.preventDefault();
    getRecipeById(Number(e.target.id));
    setShowdetails(true);
  };

  const close = (e) => {
    e.preventDefault();
    setShowdetails(false);
  };

  const fetchMoreData = () => {
    if (items.length >= 20) {
      setHasmore(false);
      return;
    }

    setTimeout(() => {
      let total = count + 4;
      setCount(total);
      setItems(props.recipeList.slice(0, total));
    }, 500);
  };

  return (
    <div id='infinite-recipesList'>
      {showpantryrecipes ?
        <h1 className='recipes'>Suggested Recipe List</h1>
      : <h1 className='recipes'>Filtered Recipe List</h1>}
      <br></br>

      {props.recipeList.length === 0 ?
        showpantryrecipes ?
          <div className='no_recipes_text'>
            No Recipes Found...
            <br></br>
            Add ingredients to pantry
          </div>
        : <div className='no_recipes_text'>
            No Recipes Found...
            <br></br>
            Add ingredients to search
          </div>
      : null}

      <div id='recipesContainer'>
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={hasmore}
          scrollableTarget='recipesContainer'
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>All Recipes Loaded</b>
            </p>
          }
        >
          {items.map((recipe) =>
            <div key={Number(recipe.id)}>
              <div className='recipesList' onClick={onClick}>
                <h2 className='recipesListTitle' id={Number(recipe.id)}>{recipe.title}</h2>
                <img className='recipesListIMG' src={recipe.image} id={Number(recipe.id)}></img>
                <hr width='85%'></hr>
              </div>
              <br></br>
            </div>
          )}
        </InfiniteScroll>
      </div>
      {showdetails ?
        <div className='modal'>
          <div className='recipe'>
            <base target='_blank'></base>
            <h1 className='recipeTitle'>{recipeinfo.title}</h1>
            <img className='recipeImage' src={recipeinfo.image}/>
            {recipeinfo.summary ?
              <p className='recipeSummary'>{parse(recipeinfo.summary)}</p>
            : null}
            {recipeinfo.extendedIngredients ?
              <div className='recipeIngredients'>
                <h2>Ingredients</h2>
                <ul className='recipeIngredientsList'>
                  {recipeinfo.extendedIngredients.map((ingredient, i) =>
                    <li key={i}>
                      <h4>{ingredient.original}</h4>
                    </li>
                  )}
                </ul>
              </div>
            : null}
            <p className='recipeExtraInfo'>
              Servings: {recipeinfo.servings}<br></br>
              Ready in {recipeinfo.readyInMinutes} Minutes<br></br>
              Cooking Instructions: <a href={recipeinfo.spoonacularSourceUrl}>{recipeinfo.title}</a><br></br>
            </p>
            <a onClick={close} className="close"></a>
          </div>
          <div className='modal_background' onClick={close}></div>
        </div>
      : null}
    </div>
  )
}

export default Recipe;