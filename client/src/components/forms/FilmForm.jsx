import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import ReactImageFallback from "react-image-fallback";
import FormMessage from "./FormMessage";
import setFormObj from "./FormUtils";

const initialData = {
  title: "",
  description: "",
  img: "",
  director: "",
  duration: "",
  price: "",
  featured: false,
  _id: null,
};

const FilmForm = props => {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (props.film._id && props.film._id !== data._id) {
      setData(props.film);
    }
    if (!props.film._id && data._id) {
      setData(initialData);
    }
  }, [props.film, data._id]);

  const validate = data => {
    const errors = {};
    if (!data.title) errors.title = "Field title cannot be blank";
    if (!data.description)
      errors.description = "Field description cannot be blank";
    if (!data.img) errors.img = "Field img cannot be blank";
    if (!data.director) errors.director = "Field director cannot be blank";
    if (!data.duration) errors.duration = "Field duration cannot be blank";
    if (!data.price) errors.price = "Field price cannot be blank";
    if (data.price <= 0) errors.price = "Field price cannot be netagive";
    if (data.duration <= 0)
      errors.duration = "Field duration cannot be netagive";

    return errors;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validate(data);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      setLoad(true);
      props.saveFilm(data).catch(err => {
        setErrors(err.response.data.errors);
        setLoad(false);
      });
    }
  };

  const cls = load ? "ui form loading" : "ui form";

  return (
    <form onSubmit={handleSubmit} className={cls}>
      <div className="ui  grid mb-3">
        <div className="two column row">
          <div className="column">
            {/* title START */}
            <div className={errors.title ? "field error" : "field"}>
              <label htmlFor="title">Film title</label>
              <input
                value={data.title}
                onChange={setFormObj(data, setData)}
                type="text"
                name="title"
                id="title"
                placeholder="film title"
              />
              <FormMessage>{errors.title}</FormMessage>
            </div>
            {/* title END */}
            {/* description START */}
            <div className={errors.description ? "field error" : "field"}>
              <label htmlFor="description">Film description</label>
              <textarea
                value={data.description}
                onChange={setFormObj(data, setData)}
                name="description"
                id="description"
                placeholder="film description"
              ></textarea>
              <FormMessage>{errors.description}</FormMessage>
            </div>
            {/* description END */}
          </div>
          <div className="column">
            {/*  image START*/}
            <div className="four wide column">
              <ReactImageFallback
                src={data.img}
                fallbackImage="http://via.placeholder.com/250x250"
                initialImage="http://via.placeholder.com/250x250"
                alt={data.title}
                className="ui image imgfit"
              />
            </div>
            <div className={errors.img ? "field error" : "field"}>
              <label htmlFor="img">Image</label>
              <input
                value={data.img}
                onChange={setFormObj(data, setData)}
                type="text"
                name="img"
                id="img"
                placeholder="img"
              />
              <FormMessage>{errors.img}</FormMessage>
            </div>
            {/*  image END */}
          </div>
        </div>

        <div className="three column row">
          {/* director START */}
          <div className="column">
            <div className={errors.director ? "field error" : "field"}>
              <label htmlFor="director">Director</label>
              <input
                value={data.director}
                onChange={setFormObj(data, setData)}
                type="text"
                name="director"
                id="director"
                placeholder="film director"
              />
              <FormMessage>{errors.director}</FormMessage>
            </div>
          </div>
          {/* director END */}
          {/* duration START */}
          <div className="column">
            <div className={errors.duration ? "field error" : "field"}>
              <label htmlFor="duration">Duration</label>
              <input
                value={data.duration}
                onChange={setFormObj(data, setData)}
                type="number"
                name="duration"
                id="duration"
                placeholder="Duration"
              />
              <FormMessage>{errors.duration}</FormMessage>
            </div>
          </div>
          {/* duration END */}
          {/* price START */}
          <div className={errors.price ? "field error" : "field"}>
            <div className="column field">
              <label htmlFor="price">Price</label>
              <input
                value={data.price}
                onChange={setFormObj(data, setData)}
                type="number"
                name="price"
                id="price"
                placeholder="price"
              />
              <FormMessage>{errors.price}</FormMessage>
            </div>
          </div>
          {/* price END */}
        </div>
        {/* featured START */}
        <div className="six wide column inline field">
          <label htmlFor="featured">Featured</label>
          <input
            value={data.featured}
            checked={data.featured}
            onChange={setFormObj(data, setData)}
            type="checkbox"
            name="featured"
            id="featured"
          />
        </div>
        {/* featured END */}

        <div className="ui fluid buttons">
          <button className="ui button primary" type="submit">
            Save
          </button>
          <div className="or"></div>
          <Link to="/films" className="ui button">
            Hide form
          </Link>
        </div>
      </div>
      {/*  ui grid END */}
    </form>
  );
};

FilmForm.propTypes = {
  saveFilm: PropTypes.func.isRequired,
};

export default FilmForm;
