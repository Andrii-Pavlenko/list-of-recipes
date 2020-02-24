import React from 'react';
import {Button, Form, Header, Icon, Label, Modal, Select} from "semantic-ui-react";
import {connect} from "react-redux";

import {RECIPE_TEXT} from "../text";
import {
  saveRecipe,
  setFormDisplayed,
  setRecipeFormTitle,
  setRecipeFormDescription, setRecipeFormDishKind
} from "../redux/actions";
import {
  getRecipeCreateFormDisplayed,
  getRecipeFormEditMode,
  getRecipeFormDescription,
  getRecipeFormTitle,
  getRecipeSaving,
  getRecipeSavingError, getRecipeFormDishKind
} from "../redux/selectors";

const options = [
  { key: 'cold', text: 'cold dishes', value: 'cold dishes' },
  { key: 'first', text: 'first dishes', value: 'first dishes' },
  { key: 'main', text: 'main dishes', value: 'main dishes' },
  { key: 'desserts', text: 'desserts', value: 'desserts' },
  { key: 'drinks', text: 'drinks', value: 'drinks' },
];

const RecipeForm = ({
  title,
  description,
  editMode,
  error,
  displayed,
  saveRecipe,
  saving,
  hide,
  setTitle,
  setDescription,
  dishKind,
  setDishKind
}) => {
  if (!displayed) {
    return null;
  }

  const icon = `${editMode ? 'pencil' : 'plus'} square`;
  return (
    <Modal closeIcon open={displayed} onClose={hide}>
      <Header icon={icon}
              content={editMode ? RECIPE_TEXT.EDIT_RECIPE : RECIPE_TEXT.NEW_RECIPE} />
      <Modal.Content>
        <Form>
          <Form.Field disabled={saving}>
            <Label>{RECIPE_TEXT.TITLE}</Label>
            <input value={title} onChange={e => setTitle(e.target.value)} autoFocus />
          </Form.Field>
          <Form.Field disabled={saving} >
            <Label>{RECIPE_TEXT.KIND_OF_DISH}</Label>
            <Select options={options} value={dishKind}
                    onChange={(e, {value}) => setDishKind(value)}
            />
          </Form.Field>
          <Form.Field disabled={saving}>
            <Label>{RECIPE_TEXT.DESCRIPTION}</Label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        { error ? <Label color="red">{error}</Label> : null }
        <Button onClick={() => saveRecipe()}
                loading={saving}
                color="green"
                disabled={saving}>
          <Icon name={icon} /> {editMode ? RECIPE_TEXT.SAVE_RECIPE : RECIPE_TEXT.CREATE_RECIPE}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default connect(state => ({
  title: getRecipeFormTitle(state),
  description: getRecipeFormDescription(state),
  dishKind: getRecipeFormDishKind(state),
  saving: getRecipeSaving(state),
  editMode: getRecipeFormEditMode(state),
  error: getRecipeSavingError(state),
  displayed: getRecipeCreateFormDisplayed(state),
}), dispatch => ({
  saveRecipe: () => dispatch(saveRecipe()),
  hide: () => dispatch(setFormDisplayed(false)),
  setTitle: title => dispatch(setRecipeFormTitle(title)),
  setDescription: description => dispatch(setRecipeFormDescription(description)),
  setDishKind: dish_kind => dispatch(setRecipeFormDishKind(dish_kind)),
}))(RecipeForm);
