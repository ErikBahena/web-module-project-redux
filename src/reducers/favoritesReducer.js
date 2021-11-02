import {
  ADD_FAVORITE,
  DELETE_FAVORITE,
  TOGGLE_ALREADY_FAVORITED,
  TOGGLE_DISPLAY,
} from "../actions/favoritesActions.js";

const initialState = {
  movies: [],
  displayFavorites: true,
};

const formatAlreadyFavorited = (state, toggledMovie, bool) => {
  // setting a new property on this movie of already favorited
  toggledMovie["toggleEffect"] = bool;

  // keep all the previous movies besides the one movie I just changed, then putting the previous movies and this toggledMovie into an array that will be returned and set to the new state, also the order is important, we want to see the movie we already favorited on the top and have the effect
  return [
    toggledMovie,
    ...state.movies.filter((movie) => movie !== toggledMovie),
  ];
};

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAVORITE:
      return {
        ...state,
        movies: [action.payload, ...state.movies],
      };

    case TOGGLE_ALREADY_FAVORITED:
      return {
        ...state,
        movies: formatAlreadyFavorited(
          state,
          action.payload.movie,
          action.payload.alreadyFavorited
        ),
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
