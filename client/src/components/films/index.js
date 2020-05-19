import React from "react"
import PropTypes from "prop-types"
import FilmCart from "./FilmCard"
import Message from "../Message"

const FilmsList = ({films}) => {
  return (
    <div className="ui four cards">
      {films.length === 0 ? (
        <Message>No films in our base yet</Message>
      ) : (
        films.map(film => <FilmCart key={film._id} film={film} />)
      )}
    </div>
  )
}

FilmsList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.object).isRequired,
}

FilmsList.defaultProps = {
  films: [],
}

export default FilmsList
