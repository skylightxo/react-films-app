import React from "react";
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";

const TopNavigation = ({logout, isAuth, isAdmin}) => {
  return (
    <div className="ui secondary pointing menu">
      <NavLink exact to="/" className="item">
        Home
      </NavLink>

      <NavLink exact to="/films" className="item">
        Films
      </NavLink>
      {isAdmin && (
        <NavLink to="/films/new" className="item">
          <i className="icon plus"></i>
          Add new film
        </NavLink>
      )}
      <div className="right menu">
        {isAuth ? (
          <span onClick={logout} className="item">
            Logout
          </span>
        ) : (
          <>
            <NavLink to="/signup" className="item">
              Signup
            </NavLink>
            <NavLink to="/login" className="item">
              Login
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

TopNavigation.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

export default TopNavigation;
