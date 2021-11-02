import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { toggleDisplay } from "../actions/favoritesActions.js";

const MovieHeader = (props) => {
  const appTitle = props.title;
  const displayFavorites = props.displayFavorites;

  const handleToggleDisplay = () => {
    props.dispatch(toggleDisplay());
  };

  return (
    <div className="table-title">
      <div className="row">
        <div className="col-sm-6">
          <h2>{appTitle}</h2>
        </div>
        <div className="col-sm-6 headerBar">
          <div onClick={handleToggleDisplay} className="btn btn-sm btn-primary">
            <span>{displayFavorites ? "Hide" : "Show"} Favorites</span>
          </div>
          <Link to="/movies" className="btn btn-sm btn-primary">
            View All Movies
          </Link>
          <Link to="/movies/add" className="btn btn-sm btn-success">
            <i className="material-icons">&#xE147;</i>{" "}
            <span>Add New Movie</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    title: state.movie.appTitle,
    displayFavorites: state.favorite.displayFavorites,
  };
};

export default connect(mapStateToProps)(MovieHeader);
