import React from "react";
import PropTypes from "prop-types";
import FilmCart from "./FilmCart";
import Message from "../Message";

function FilmsList({films}) {
  return (
    <div className="ui four cards">
      {!films.length ? (
        <Message>No fims yet in our database</Message>
      ) : (
        films.map(film => <FilmCart key={film._id} film={film} />)
      )}
    </div>
  );
}

FilmsList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.object).isRequired,
};

FilmsList.defaultProps = {
  films: [],
};

export default FilmsList;
