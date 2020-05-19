import React, {useContext, useState, useMemo} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import FilmContext from "../contexts/FilmContext";

const FilmCartButtons = ({film}) => {
  const {deleteFilm} = useContext(FilmContext);

  return useMemo(() => {
    return <FilmCartButtonsRender deleteFilm={deleteFilm} film={film} />;
  }, [film, deleteFilm]);
};

const FilmCartButtonsRender = ({film, deleteFilm}) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const show = () => setShowConfirm(true);
  const hide = () => setShowConfirm(false);

  const removeFilm = () => deleteFilm(film);

  const actionConfirm = (
    <div className="ui two buttons">
      <span onClick={removeFilm} className="ui red basic button">
        <i className="ui icon check" /> YES
      </span>
      <span onClick={hide} className="ui grey basic button">
        <i className="ui icon close" /> NO
      </span>
    </div>
  );

  const actionEdit = (
    <div className="extra content">
      <div className="ui two buttons">
        <Link to={`/films/edit/${film._id}`} className="ui green basic button">
          <i className="ui icon edit"></i>
        </Link>
        <span onClick={show} className="ui red basic button">
          <i className="ui icon trash"></i>
        </span>
      </div>
    </div>
  );

  console.log("Render button", film._id);
  return (
    <div className="extra content">
      {showConfirm ? actionConfirm : actionEdit}
    </div>
  );
};

FilmCartButtons.propTypes = {
  film: PropTypes.object.isRequired,
};

export default FilmCartButtons;
