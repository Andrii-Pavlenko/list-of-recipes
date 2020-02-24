import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {Button, Container, Divider, Icon, Loader, Message, Table} from "semantic-ui-react";

import {
  getActivePage,
  getRecipeLoadingError,
  getRecipeRemovedIds,
  getRecipes,
  getShowAllRecipes
} from "../redux/selectors";
import {loadRecipes, removeRecipe, setFormDisplayed} from "../redux/actions";
import {RECIPE_TEXT} from "../text";
import RecipeForm from "./RecipeForm";

const rightArrayOfRecipes = (rec) => {
  let obj = {};
  obj.id = rec.id;
  obj.recipes = [];
  if (Array.isArray(rec.title)) {
    for (let i = 0; i < rec.title.length; i++) {
      obj.recipes.push([rec.title[i]])
    }
    for (let i = 0; i < rec.description.length; i++) {
      obj.recipes[i].push(rec.description[i])
    }
    for (let i = 0; i < rec.creation_date.length; i++) {
      obj.recipes[i].push(rec.creation_date[i])
    }
    for (let i = 0; i < rec.dish_kind.length; i++) {
      obj.recipes[i].push(rec.dish_kind[i])
    }
    return [obj];
  }
  obj.recipes.push([rec.title, rec.description, rec.creation_date, rec.dish_kind]);
  return [obj]
};

const AllPreviousRecipes = ({ recipes, error, load, removedIds, removeRecipe, showEditRecipeForm, showAllRecipes }) => {
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
        {recipes.filter(rec => rec.id === showAllRecipes).map(recipe => {
          const removing = removedIds.includes(recipe.id);
          return (
            <div key={recipe.id}>
              <div className="button__container">
                <Button
                  icon
                  onClick={() => {
                    showEditRecipeForm(recipe.id);
                    load();
                  }}
                >
                  <Icon name="pencil"/>
                </Button>
                <Button
                  icon
                  loading={removing}
                  disabled={removing}
                  onClick={() => removeRecipe(recipe.id)}
                >
                  <Icon name="close" color="red"/>
                </Button>
              </div>
                {rightArrayOfRecipes(recipe).map(rec =>  (
                  <Container key={recipe.id} className="small-table__container">
                    {rec.recipes.map((recipe, i) => (
                      <Table definition key={i}>
                        <Table.Body>
                          <Table.Row>
                            <Table.Cell>Title:</Table.Cell>
                            <Table.Cell>{recipe[0]}</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>Creation date:</Table.Cell>
                            <Table.Cell>{new Date(recipe[2]).toLocaleDateString('uk-UA')}</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>Kind of dish:</Table.Cell>
                            <Table.Cell>{recipe[3]}</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>Description:</Table.Cell>
                            <Table.Cell>{recipe[1]}</Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      </Table>
                    ))}
                  </Container>
                )
              )}
            </div>
          );
        })}
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
  removedIds: getRecipeRemovedIds(state),
  showAllRecipes: getShowAllRecipes(state),
}), dispatch => ({
  load: () => dispatch(loadRecipes()),
  showCreateRecipeForm: () => dispatch(setFormDisplayed(true)),
  showEditRecipeForm: id => dispatch(setFormDisplayed(true, id)),
  removeRecipe: id => dispatch(removeRecipe(id)),
}))(AllPreviousRecipes);
