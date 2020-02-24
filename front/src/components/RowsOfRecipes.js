import React from 'react';
import {Button, Icon, Table} from "semantic-ui-react";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";

import {getRecipeRemovedIds} from "../redux/selectors";
import {loadRecipes, removeRecipe, setFormDisplayed, setShowAllRecipes} from "../redux/actions";

const RowsOfRecipes = ({ recipe, load, removedIds, removeRecipe, showEditRecipeForm, showAllRecipes }) => {
  const removing = removedIds.includes(recipe.id);
  return (
    <Table.Row key={recipe.id}>
      <Table.Cell className="table-cell">
        {Array.isArray(recipe.title) ? recipe.title[0] : recipe.title}
      </Table.Cell>
      <Table.Cell className="text-area table-cell">
        {Array.isArray(recipe.description) ? recipe.description[0] : recipe.description}
      </Table.Cell>
      <Table.Cell>
        {Array.isArray(recipe["creation_date"])
          ? new Date(recipe["creation_date"][0]).toLocaleDateString('uk-UA')
          : new Date(recipe["creation_date"]).toLocaleDateString('uk-UA')}
      </Table.Cell>
      <Table.Cell>
        <Button icon onClick={() => { showEditRecipeForm(recipe.id); load() }}>
          <Icon name="pencil" />
        </Button>
      </Table.Cell>
      <Table.Cell>
        <Button icon loading={removing} disabled={removing} onClick={() => removeRecipe(recipe.id)}>
          <Icon name="close" color="red" />
        </Button>
      </Table.Cell>
      <Table.Cell>
        <Button icon as={NavLink} to="all_previous_recipes" exact onClick={() => showAllRecipes(recipe.id)}>
          <Icon name="reply all" />
        </Button>
      </Table.Cell>
    </Table.Row>
  );
};

export default connect(state => ({
  removedIds: getRecipeRemovedIds(state),
}), dispatch => ({
  load: () => dispatch(loadRecipes()),
  showEditRecipeForm: id => dispatch(setFormDisplayed(true, id)),
  removeRecipe: id => dispatch(removeRecipe(id)),
  showAllRecipes: id => dispatch(setShowAllRecipes(id)),
}))(RowsOfRecipes);
