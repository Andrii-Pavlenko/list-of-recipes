import { ENDPOINTS } from "../consts";
import { RECIPE_TEXT } from "../text";
import {
  getRecipeEditedId,
  getRecipeFormDescription, getRecipeFormDishKind,
  getRecipeFormTitle
} from "./selectors";

export const RECIPE_ACTIONS = {
  POPULATE: 'POPULATE',
  SET_LOADING_ERROR: 'SET_LOADING_ERROR',

  SET_CREATE_FORM_DISPLAYED: 'SET_CREATE_FORM_DISPLAYED',
  SET_SAVING: 'SET_SAVING',
  SET_SAVING_ERROR: 'SET_SAVING_ERROR',

  ADD: 'ADD',
  SAVE: 'SAVE',
  UPDATE_FORM_TITLE: 'FORM_TITLE',
  UPDATE_FORM_DESCRIPTION: 'FORM_DESCRIPTION',
  UPDATE_FORM_DISH_KIND: 'FORM_DISH_KIND',

  ADD_REMOVED_ID: 'ADD_REMOVED_ID',
  REMOVE: 'REMOVE',

  ACTIVE_PAGE: 'ACTIVE_PAGE',
  SHOW_ALL_RECIPES: 'SHOW_ALL_RECIPES',
};

export function populate(recipes) {
  return {
    type: RECIPE_ACTIONS.POPULATE,
    payload: recipes,
  };
}

function setLoadingError(error) {
  return {
    type: RECIPE_ACTIONS.SET_LOADING_ERROR,
    payload: error,
  }
}

export function setFormDisplayed(displayed, editedId = null) {
  return {
    type: RECIPE_ACTIONS.SET_CREATE_FORM_DISPLAYED,
    payload: {
      displayed,
      editedId,
    },
  };
}

function setSaving(saving) {
  return {
    type: RECIPE_ACTIONS.SET_SAVING,
    payload: saving,
  };
}

function setSavingError(savingError) {
  return {
    type: RECIPE_ACTIONS.SET_SAVING_ERROR,
    payload: savingError,
  };
}

function save(editMode, recipe) {
  return {
    type: editMode ? RECIPE_ACTIONS.SAVE : RECIPE_ACTIONS.ADD,
    payload: recipe,
  }
}

export function loadRecipes(params) {
  return async dispatch => {
    dispatch(setLoadingError(null));
    let success = false;
    try {
      const response = await fetch(ENDPOINTS.RECIPES);
      if (response.status === 200) {
        const recipes = await response.json();
        dispatch(populate(recipes));
        success = true;
      }
    } finally  {
      if (!success) {
        dispatch(setLoadingError(RECIPE_TEXT.LOADING_ERROR))
      }
    }
  }
}

export function saveRecipe() {
  return async (dispatch, getState) => {
    const state = getState();
    const recipeId = getRecipeEditedId(state);
    const title = getRecipeFormTitle(state);
    const description = getRecipeFormDescription(state);
    const dish_kind = getRecipeFormDishKind(state);
    dispatch(setSaving(true));
    dispatch(setSavingError(null));
    let success = false;
    try {
      const response = await fetch(ENDPOINTS.RECIPES + (recipeId === null ? '' : '/' + recipeId), {
        method: recipeId === null ? 'POST' : 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ title, description, dish_kind })
      });
      if (response.ok) {
        const recipe = await response.json();
        dispatch(save(recipeId  !== null, recipe ));
        success = true;
      }
    } finally  {
      dispatch(setSaving(false));
      if (success) {
        dispatch(setFormDisplayed(false));
      } else {
        dispatch(setSavingError(RECIPE_TEXT.SAVING_ERROR));
      }
    }
  }
}

function addRemovedId(id) {
  return {
    type: RECIPE_ACTIONS.ADD_REMOVED_ID,
    payload: id,
  };
}

function remove(id) {
  return {
    type: RECIPE_ACTIONS.REMOVE,
    payload: id,
  };
}

export function removeRecipe(id) {
  return async dispatch => {
    dispatch(addRemovedId(id));
    const response = await fetch(`${ENDPOINTS.RECIPES}/${id}`, {
      method: 'DELETE'
    });
    const json = await response.json();
    if (json.error === null) {
      dispatch(remove(id));
    }
  }
}

export function setRecipeFormTitle(title) {
  return {
    type: RECIPE_ACTIONS.UPDATE_FORM_TITLE,
    payload: title,
  }
}

export function setRecipeFormDescription(description) {
  return {
    type: RECIPE_ACTIONS.UPDATE_FORM_DESCRIPTION,
    payload: description,
  }
}

export function setRecipeFormDishKind(dish_kind) {
  return {
    type: RECIPE_ACTIONS.UPDATE_FORM_DISH_KIND,
    payload: dish_kind,
  }
}

export function setActivePage(page) {
  return {
    type: RECIPE_ACTIONS.ACTIVE_PAGE,
    payload: page,
  }
}

export function setShowAllRecipes(id) {
  return {
    type: RECIPE_ACTIONS.SHOW_ALL_RECIPES,
    payload: id,
  }
}
