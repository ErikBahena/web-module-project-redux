export const DELETE_FAVORITE = "DELETE_FAVORITE";
export const ADD_FAVORITE = "ADD_FAVORITE";
export const TOGGLE_DISPLAY = "TOGGLE_DISPLAY";
export const TOGGLE_ALREADY_FAVORITED = "TOGGLE_ALREADY_FAVORITED";

export const addFavorite = (newMovie) => {
  return { type: ADD_FAVORITE, payload: newMovie };
};

export const deleteFavorite = (id) => {
  return { type: DELETE_FAVORITE, payload: id };
};

export const toggleDisplay = () => {
  return { type: TOGGLE_DISPLAY };
};

export const toggleAlreadyFavorited = (movie, alreadyFavorited) => {
  return {
    type: TOGGLE_ALREADY_FAVORITED,
    payload: { movie, alreadyFavorited },
  };
};
