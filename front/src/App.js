import React from 'react';
import {connect} from "react-redux";
import {NavLink, Route, Switch} from "react-router-dom";
import {Menu} from "semantic-ui-react";
import Popup from "reactjs-popup";

import Recipes from "./components/Recipes";
import './App.css';
import UnKnownPage from "./components/UnKnownPage";
import {loadRecipes, setActivePage} from "./redux/actions";
import {DISHES_KIND} from "./text";
import AllPreviousRecipes from "./components/AllPreviousRecipes";
import BurgerIcon from "./components/BurgerIcon";
import {getFormDisplayed} from "./redux/selectors";

function App({activePage, isDisplayed}) {

  const contentStyle = {
    background: "rgba(255,255,255,0)",
    width: "80%",
    border: "none"
  };

  return (
    <div className="app" >
      <Menu>
        <Menu.Item as={NavLink} to="/" exact onClick={() => activePage('')}>All</Menu.Item>
        <Menu.Item as={NavLink} to="/cold_dishes" exact onClick={() => activePage(DISHES_KIND.COLD_DISHES)}>{DISHES_KIND.COLD_DISHES}</Menu.Item>
        <Menu.Item as={NavLink} to="/first_dishes" exact onClick={() => activePage(DISHES_KIND.FIRST_DISHES)}>{DISHES_KIND.FIRST_DISHES}</Menu.Item>
        <Menu.Item as={NavLink} to="/main_dishes" exact onClick={() => activePage(DISHES_KIND.MAIN_DISHES)}>{DISHES_KIND.MAIN_DISHES}</Menu.Item>
        <Menu.Item as={NavLink} to="/desserts" exact onClick={() => activePage(DISHES_KIND.DESSERTS)}>{DISHES_KIND.DESSERTS}</Menu.Item>
        <Menu.Item as={NavLink} to="/drinks" exact onClick={() => activePage(DISHES_KIND.DRINKS)}>{DISHES_KIND.DRINKS}</Menu.Item>
      </Menu>

      <div className={isDisplayed ? 'burger-menu-hide' : "burger-menu"} >
        <Popup
          modal
          overlayStyle={{ background: "rgba(255,255,255,0.98" }}
          contentStyle={contentStyle}
          closeOnDocumentClick={false}
          trigger={open => <BurgerIcon open={open} />}
        >
          {close => (
            <div className="menu">
              <ul>
                <li>
                  <NavLink className="link" onClick={() => close && activePage(DISHES_KIND.HOME)} activeClassName="current" to="/">
                    {DISHES_KIND.HOME}
                  </NavLink>
                </li>
                <li>
                  <NavLink className="link" onClick={() => close && activePage(DISHES_KIND.COLD_DISHES)} activeClassName="current" to="/cold_dishes">
                    {DISHES_KIND.COLD_DISHES}
                  </NavLink>
                </li>
                <li>
                  <NavLink className="link" onClick={() => close && activePage(DISHES_KIND.FIRST_DISHES)} activeClassName="current" to="/first_dishes">
                    {DISHES_KIND.FIRST_DISHES}
                  </NavLink>
                </li>
                <li>
                  <NavLink className="link" onClick={() => close && activePage(DISHES_KIND.MAIN_DISHES)} activeClassName="current" to="/main_dishes">
                    {DISHES_KIND.MAIN_DISHES}
                  </NavLink>
                </li>
                <li>
                  <NavLink className="link" onClick={() => close && activePage(DISHES_KIND.DESSERTS)} activeClassName="current" to="/desserts">
                    {DISHES_KIND.DESSERTS}
                  </NavLink>
                </li>
                <li>
                  <NavLink className="link" onClick={() => close && activePage(DISHES_KIND.DRINKS)} activeClassName="current" to="/drinks">
                    {DISHES_KIND.DRINKS}
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
        </Popup>
      </div>

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
  activePage: page => {
    document.querySelector(".burger-menu.open") && document.querySelector(".burger-menu.open").click();
    return dispatch(setActivePage(page));
  },
}))(App);
