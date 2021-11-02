import React from "react";
import { useParams, useHistory } from "react-router-dom";

import { connect } from "react-redux";

// Actions
import { deleteMovie } from "../actions/movieActions";

import { addFavorite } from "../actions/favoritesActions.js";

import { toggleDisplay } from "../actions/favoritesActions.js";
import { toggleAlreadyFavorited } from "../actions/favoritesActions.js";

import { deleteFavorite } from "../actions/favoritesActions.js";

const Movie = (props) => {
  const { id } = useParams();
  const { push } = useHistory();

  const movies = props.movies;
  const movie = movies.find((movie) => movie.id === Number(id));

  const handleDeleteMovie = () => {
    props.dispatch(deleteMovie(+id));
    props.dispatch(deleteFavorite(+id));
    push("/movies");
  };

  const handleFavorite = () => {
    // Check if the movie is already in the favorites before adding it in, I did this here instead of in the reducer because I don't want to fire off the entire dispatch function, addFavorite action, and run the reducer function, I think this is just more simple and maybe more efficient.
    isMovieAFavorite();

    // if the favorites display IS NOT showing when this function is called then I want to change my state so that The favorites bar opens. Not in the mvp or stretch but seem's necessary.
    if (!props.displayFavorites) props.dispatch(toggleDisplay());
  };

  const isMovieAFavorite = () => {
    if (!props.favoriteMovies.includes(movie)) {
      props.dispatch(addFavorite(movie));
    }

    // I decided to leave the favorite button because if the user decided to be viewing the movies with the favorites bar hidden, then they would have to go all the way up and click the show favorites button on the header. I also made it so that if a user clicks the favorite button and the favorites bar is not showing, then show the favorites bar will show, and you can't save the same movie twice. This takes care of two issues, the user being able to save the same movie twice, and knowing whether or not something is already favorited. For good measure I'm going to add a class on the favorited movie that applys some css transition so that it will show if the movie is already favorited as well.

    if (props.favoriteMovies.includes(movie)) {
      props.dispatch(toggleAlreadyFavorited(movie, true));
      // There is definitely a better way to do this, I'll get there one day.
      setTimeout(() => {
        props.dispatch(toggleAlreadyFavorited(movie, false));
      }, 500);
    }
  };

  return (
    <div className="modal-page col">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">{movie.title} Details</h4>
          </div>
          <div className="modal-body">
            <div className="flexContainer">
              <section className="movie-details">
                <div>
                  <label>
                    Title: <strong>{movie.title}</strong>
                  </label>
                </div>
                <div>
                  <label>
                    Director: <strong>{movie.director}</strong>
                  </label>
                </div>
                <div>
                  <label>
                    Genre: <strong>{movie.genre}</strong>
                  </label>
                </div>
                <div>
                  <label>
                    Metascore: <strong>{movie.metascore}</strong>
                  </label>
                </div>
                <div>
                  <label>Description:</label>
                  <p>
                    <strong>{movie.description}</strong>
                  </p>
                </div>
              </section>

              <section>
                <span onClick={handleFavorite} className="m-2 btn btn-dark">
                  Favorite
                </span>
                <span onClick={handleDeleteMovie} className="delete">
                  <input
                    type="button"
                    className="m-2 btn btn-danger"
                    value="Delete"
                  />
                </span>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    movies: state.movie.movies,
    favoriteMovies: state.favorite.movies,
    displayFavorites: state.favorite.displayFavorites,
  };
};

export default connect(mapStateToProps)(Movie);
