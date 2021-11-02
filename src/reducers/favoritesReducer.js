import {
  ADD_FAVORITE,
  DELETE_FAVORITE,
  TOGGLE_DISPLAY,
} from "../actions/favoritesActions.js";

const initialState = {
  movies: [],
  displayFavorites: true,
};

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAVORITE:
      return {
        ...state,
        movies: [action.payload, ...state.movies],
      };

    case TOGGLE_DISPLAY:
      return {
        ...state,
        displayFavorites: !state.displayFavorites,
      };

    case DELETE_FAVORITE:
      return {
        ...state,
        movies: state.movies.filter((movie) => movie.id !== action.payload),
      };
    default:
      return state;
  }
};
export default favoritesReducer;
