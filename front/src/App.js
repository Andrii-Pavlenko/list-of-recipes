import React from 'react';
import {connect} from "react-redux";
import {NavLink, Route, Switch} from "react-router-dom";
import {Menu} from "semantic-ui-react";

import Recipes from "./components/Recipes";
import './App.css';
import UnKnownPage from "./components/UnKnownPage";
import {loadRecipes, setActivePage} from "./redux/actions";
import {DISHES_KIND} from "./text";
import AllPreviousRecipes from "./components/AllPreviousRecipes";
import {getFormDisplayed} from "./redux/selectors";
import Burger from "./components/Burger";

function App({activePage}) {

  return (
    <div className="app" >
      <Menu>
        <Menu.Item as={NavLink} to="/" exact onClick={() => activePage('')}>
          All
        </Menu.Item>
        <Menu.Item as={NavLink} to="/cold_dishes" exact onClick={() => activePage(DISHES_KIND.COLD_DISHES)}>
          {DISHES_KIND.COLD_DISHES}
        </Menu.Item>
        <Menu.Item as={NavLink} to="/first_dishes" exact onClick={() => activePage(DISHES_KIND.FIRST_DISHES)}>
          {DISHES_KIND.FIRST_DISHES}
        </Menu.Item>
        <Menu.Item as={NavLink} to="/main_dishes" exact onClick={() => activePage(DISHES_KIND.MAIN_DISHES)}>
          {DISHES_KIND.MAIN_DISHES}
        </Menu.Item>
        <Menu.Item as={NavLink} to="/desserts" exact onClick={() => activePage(DISHES_KIND.DESSERTS)}>
          {DISHES_KIND.DESSERTS}
        </Menu.Item>
        <Menu.Item as={NavLink} to="/drinks" exact onClick={() => activePage(DISHES_KIND.DRINKS)}>
          {DISHES_KIND.DRINKS}
        </Menu.Item>
      </Menu>

      <Burger />

      <Switch>
        <Route path="/" exact component={Recipes} />
        <Route path="/cold_dishes" exact component={Recipes} />
        <Route path="/first_dishes" exact component={Recipes} />
        <Route path="/main_dishes" exact component={Recipes} />
        <Route path="/desserts" exact component={Recipes} />
        <Route path="/drinks" exact component={Recipes} />
        <Route path="/all_previous_recipes" exact component={AllPreviousRecipes}/>
        <Route component={UnKnownPage} />
      </Switch>
    </div>
  );
}

export default connect(state => ({
    isDisplayed: getFormDisplayed(state),
  }),
  dispatch => ({
  load: () => dispatch(loadRecipes()),
  activePage: page => dispatch(setActivePage(page)),
}))(App);
