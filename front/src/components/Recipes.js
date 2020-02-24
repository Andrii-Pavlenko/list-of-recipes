import React, { useEffect } from 'react';
import {Table, Message, Loader, Divider, Button, Container} from 'semantic-ui-react';
import { connect } from 'react-redux';

import {RECIPE_TEXT} from '../text';
import {loadRecipes, setFormDisplayed} from '../redux/actions';
import {getActivePage, getRecipeLoadingError, getRecipes} from "../redux/selectors";
import RecipeForm from "./RecipeForm";
import RowsOfRecipes from "./RowsOfRecipes";

const Recipes = ({ activePage, recipes, error, load, showCreateRecipeForm }) => {
  useEffect(() => {
    load();
  }, [load]);


  if (error) {
    return (
      <Message negative>
        <Message.Header>{error}</Message.Header>
        <Divider />
        <Button type="button" onClick={load}>{RECIPE_TEXT.RETRY_LOADING}</Button>
      </Message>
    )
  } else if (recipes) {
    return (
      <>
        <Container className="main-table__container">
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>{RECIPE_TEXT.TITLE}</Table.HeaderCell>
                <Table.HeaderCell>{RECIPE_TEXT.DESCRIPTION}</Table.HeaderCell>
                <Table.HeaderCell>{RECIPE_TEXT.DATE}</Table.HeaderCell>
                <Table.HeaderCell>{RECIPE_TEXT.EDIT}</Table.HeaderCell>
                <Table.HeaderCell>{RECIPE_TEXT.DELETE}</Table.HeaderCell>
                <Table.HeaderCell>{RECIPE_TEXT.PREVIOUS}</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {activePage ?
                recipes.filter(rec => (Array.isArray(
                  rec.dish_kind)
                  ? rec.dish_kind[0]
                  : rec.dish_kind
                ) === activePage.toLowerCase()).map(recipe => (
                <RowsOfRecipes recipe={recipe}/>
              ))
              : recipes.map(recipe => (
                  <RowsOfRecipes recipe={recipe} key={recipe.id}/>
                ))}
            </Table.Body>
          </Table>

        </Container>
      <Button onClick={showCreateRecipeForm}>{RECIPE_TEXT.NEW_RECIPE}</Button>
      <RecipeForm />
    </>
    );
  } else {
    return <Loader active inline="centered" />;
  }
};

export default connect(state => ({
  recipes: getRecipes(state),
  error: getRecipeLoadingError(state),
  activePage: getActivePage(state),
}), dispatch => ({
  load: () => dispatch(loadRecipes()),
  showCreateRecipeForm: () => dispatch(setFormDisplayed(true)),
}))(Recipes);
