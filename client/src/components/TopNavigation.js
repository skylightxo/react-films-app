import React from "react"
import PropTypes from "prop-types"

const TopNavigation = ({showForm}) => {
  return (
    <div className="ui secondary pointing menu">
      <a href="/" className="item">
        Home
      </a>
      <span className="item" onClick={showForm}>
        <i className="icon plus"></i>
        Add new film
      </span>
    </div>
  )
}

TopNavigation.propTypes = {
  showForm: PropTypes.func.isRequired,
}

export default TopNavigation
