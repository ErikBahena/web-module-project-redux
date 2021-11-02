import React from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { deleteFavorite } from "../actions/favoritesActions";

const FavoriteMovieList = (props) => {
  const favorites = props.movies;

  const handleDeleteFavorite = (id) => {
    props.dispatch(deleteFavorite(id));
  };

  return (
    <div className="col-xs savedContainer">
      <h5>Favorite Movies</h5>
      {favorites.map((movie) => {
        return (
          <div key={movie.id}>
            <Link
              className="btn btn-light savedButton"
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
