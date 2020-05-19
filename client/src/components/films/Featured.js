import React from "react"
import PropTypes from "prop-types"
import FilmContext from "../context/FilmContext"

const Featured = ({featured, id}) => {
  const {toggleFeatured} = React.useContext(FilmContext)
  const cls = featured ? "yellow" : "empty"
  return (
    <span className="ui right corner label" onClick={toggleFeatured(id)}>
      <i className={`star icon ${cls}`}></i>
    </span>
  )
}

Featured.propTypes = {
  id: PropTypes.string.isRequired,
  featured: PropTypes.bool.isRequired,
}

export default Featured
