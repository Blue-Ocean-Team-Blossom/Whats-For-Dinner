/* eslint-disable */
import React, { useContext } from 'react';
import { RecipeContext } from '../../state_&_contexts/RecipeContext';
import { APIContext } from '../../state_&_contexts/APIContext';
import { UserContext} from '../../state_&_contexts/UserContext'

const Nav = (props) => {
  const { showpantryrecipes, setShowpantryrecipes } = useContext(RecipeContext);
  const {} = useContext(APIContext)
  const {username, token, userId, setUsername, setUserId, setToken} = useContext(UserContext)

  const changeRecipeView = (boolean) => {
    setShowpantryrecipes(boolean);
  }

  return (
    <div>
      <br></br>
      {userId > 0 ?
      <button className='btn fill' onClick={() => {setToken(''); setUserId(0); setUsername(''); props.changeView('login')}}>Log Out</button>:
      <button className='btn fill' onClick={() => {props.changeView('login')}}>Log In</button> }
      {userId > 0 ?
      <button className='btn fill' onClick={() => {props.changeView('recipeList'), changeRecipeView(true)}}>Home</button> : null
    }
    {userId > 0 ?
    <button className='btn fill' onClick={() => props.changeView('pantryList')}>Pantry</button> : null
    }
      <br></br>
      <hr width={'78.6%'} align={'left'} color='#4F5902'></hr>
      <br></br>
      {props.homeView === 'recipeList' ?
        showpantryrecipes ?
        <button className='btn fill' onClick={() => changeRecipeView(false)}>Search Recipes</button>
        : <button className='btn fill' onClick={() => changeRecipeView(true)}>Suggested Recipes</button>
      : null}

    </div>
  )
}

export default Nav;
