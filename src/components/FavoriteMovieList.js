import React from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { deleteFavorite } from "../actions/favoritesActions";

import { toggleDisplay } from "../actions/favoritesActions";

import { toggleAlreadyFavorited } from "../actions/favoritesActions";

const FavoriteMovieList = (props) => {
  const favorites = props.movies;

  const handleDeleteFavorite = (id) => {
    props.dispatch(deleteFavorite(id));
    checkIfEmpty();
  };

  const checkIfEmpty = () => {
    // props.movies seems to be one ahead than the actual store, I don't know why. I tried to make this async so that we could maybe wait for the store to be updated, did not work. I just subtracted one, I know this is not the right way to do it, I just dont know how.
    if (favorites.length - 1 === 0 || favorites.length === 0)
      props.dispatch(toggleDisplay());
  };

  return (
    <div className="col-xs savedContainer">
      <h5>Favorite Movies</h5>
      {favorites.map((movie) => {
        return (
          <div key={movie.id}>
            <Link
              className={`btn btn-light savedButton ${
                movie.toggleEffect ? "shake-effect" : ""
              }`}
              to={`/movies/${movie.id}`}
            >
              {movie.title}
              <span
                data-id={`${movie.id}`}
                onClick={() => handleDeleteFavorite(movie.id)}
              >
                <span className="material-icons">remove_circle</span>
              </span>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    movies: state.favorite.movies,
  };
};

export default connect(mapStateToProps)(FavoriteMovieList);
