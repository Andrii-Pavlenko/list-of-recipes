import { RECIPE_ACTIONS } from "./actions";
import {DISHES_KIND} from "../text";

const initialState = {
  list: null,
  loadingError: null,

  formDisplayed: false,
  saving: false,
  savingError: false,

  formTitle: null,
  formDescription: null,
  formDishKind: null,
  editedId: null,

  removedIds: [],

  activePage: '',
  showAllRecipes: null,
  allRecipes: null,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case RECIPE_ACTIONS.POPULATE:
      return {
        ...state,
        list: action.payload,
      };

    case RECIPE_ACTIONS.SET_LOADING_ERROR:
      return {
        ...state,
        loadingError: action.payload,
      };

    case RECIPE_ACTIONS.SET_CREATE_FORM_DISPLAYED:
      const { editedId, displayed } = action.payload;
      const editedRecipe =  editedId === null ? null : state.list.find(recipe => recipe.id === editedId);
      return {
        ...state,
        formDisplayed: displayed,
        editedId: editedId,
        formTitle: editedRecipe === null ? '' : Array.isArray(editedRecipe.title) ? editedRecipe.title[0] : editedRecipe.title,
        formDescription: editedRecipe === null ? '' : Array.isArray(editedRecipe.description) ? editedRecipe.description[0] : editedRecipe.description,
        formDishKind: editedRecipe === null ? '' : Array.isArray(editedRecipe["dish_kind"]) ? editedRecipe["dish_kind"][0] : editedRecipe["dish_kind"],
      };

    case RECIPE_ACTIONS.SET_SAVING:
      return {
        ...state,
        saving: action.payload,
      };

    case RECIPE_ACTIONS.SET_SAVING_ERROR:
      return {
        ...state,
        savingError: action.payload,
      };

    case RECIPE_ACTIONS.ADD:
      return {
        ...state,
        list: [...state.list, action.payload],
      };

    case RECIPE_ACTIONS.ADD_REMOVED_ID:
      return {
        ...state,
        removedIds: [...state.removedIds, action.payload],
      };

    case RECIPE_ACTIONS.REMOVE:
      return {
        ...state,
        list: state.list.filter(recipe => recipe.id !== action.payload),
        removedIds: state.removedIds.filter(id => id !== action.payload),
      };

    case RECIPE_ACTIONS.SAVE:
      return {
        ...state,
        list: state.list.map(recipe => recipe.id === state.editedId ? action.payload : recipe),
      };

    case RECIPE_ACTIONS.UPDATE_FORM_TITLE:
      return {
        ...state,
        formTitle: action.payload,
      };

    case RECIPE_ACTIONS.UPDATE_FORM_DESCRIPTION:
      return {
        ...state,
        formDescription: action.payload,
      };

    case RECIPE_ACTIONS.UPDATE_FORM_DISH_KIND:
      return {
        ...state,
        formDishKind: action.payload,
      };

    case RECIPE_ACTIONS.ACTIVE_PAGE:
      if (action.payload === DISHES_KIND.HOME) {
        return {
          ...state,
          activePage: '',
        }
      }
      return {
        ...state,
        activePage: action.payload,
      };

    case RECIPE_ACTIONS.SHOW_ALL_RECIPES:
      return {
        ...state,
        showAllRecipes: action.payload,
      };

    default:
      return state;
  }
}
