import React from 'react';
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import Popup from "reactjs-popup";

import {loadRecipes, setActivePage} from "../redux/actions";
import {DISHES_KIND} from "../text";
import BurgerIcon from "./BurgerIcon";
import {getFormDisplayed} from "../redux/selectors";

function Burger({activePage, isDisplayed}) {

  const contentStyle = {
    background: "rgba(255,255,255,0)",
    width: "80%",
    border: "none"
  };

  return (
    <>
      <div className={isDisplayed ? 'burger-menu-hide' : ""} >
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
                  <NavLink
                    className="link"
                    onClick={() => {
                      close();
                      activePage(DISHES_KIND.HOME);
                    }}
                    activeClassName="current"
                    to="/"
                  >
                    {DISHES_KIND.HOME}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="link"
                    onClick={() => {
                      close();
                      activePage(DISHES_KIND.COLD_DISHES);
                    }}
                    activeClassName="current"
                    to="/cold_dishes"
                  >
                    {DISHES_KIND.COLD_DISHES}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="link"
                    onClick={() => {
                      close();
                      activePage(DISHES_KIND.FIRST_DISHES);
                    }}
                    activeClassName="current"
                    to="/first_dishes"
                  >
                    {DISHES_KIND.FIRST_DISHES}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="link"
                    onClick={() => {
                      close();
                      activePage(DISHES_KIND.MAIN_DISHES);
                    }}
                    activeClassName="current"
                    to="/main_dishes"
                  >
                    {DISHES_KIND.MAIN_DISHES}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="link"
                    onClick={() => {
                      close();
                      activePage(DISHES_KIND.DESSERTS);
                    }}
                    activeClassName="current"
                    to="/desserts"
                  >
                    {DISHES_KIND.DESSERTS}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="link"
                    onClick={() => {
                      close();
                      activePage(DISHES_KIND.DRINKS);
                    }}
                    activeClassName="current"
                    to="/drinks"
                  >
                    {DISHES_KIND.DRINKS}
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
        </Popup>
      </div>
    </>
  );
}

export default connect(state => ({
    isDisplayed: getFormDisplayed(state),
  }),
  dispatch => ({
    load: () => dispatch(loadRecipes()),
    activePage: page => dispatch(setActivePage(page)),
  }))(Burger);
