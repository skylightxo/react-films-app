import React, {Profiler, memo, useContext} from "react";
import PropTypes from "prop-types";
import Featured from "./Featured";
import FilmCartButtons from "./FilmCartButtons";
import UserContext from "../contexts/UserContext";

function FilmCart({film}) {
  console.log("Render Cart", film._id);
  const {user} = useContext(UserContext);

  const userButton = (
    <div className="extra content">
      <button className="ui negative basic button">Show Film</button>
    </div>
  );

  return (
    <div className="ui card">
      <Featured featured={film.featured} id={film._id} />

      <div className="image">
        <span className="ui green label ribbon">$ {film.price} </span>
        <img src={film.img} alt={film.title} />
      </div>
      <div className="content">
        <span className="header">{film.title}</span>
        <div className="meta">
          <i className="icon users"></i> {film.director}
          <span className="right floated">
            <i className="icon wait right"></i> {film.duration} min
          </span>
        </div>
      </div>
      <Profiler id="btns" onRender={() => {}}>
        {user.token && user.role === "admin" && <FilmCartButtons film={film} />}
        {user.token && user.role === "user" && userButton}
      </Profiler>
    </div>
  );
}

FilmCart.propTypes = {
  film: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    description: PropTypes.string,
    duration: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    featured: PropTypes.bool.isRequired,
  }).isRequired,
};

FilmCart.defaultProps = {
  film: {},
};
export default memo(FilmCart);
