import React, {Component} from "react"
import PropTypes from "prop-types"
import ReactImageFallback from "react-image-fallback"
import FormMessage from "./FormMessage"

const initData = {
	_id: null,
  title: "",
  img: "",
  director: "",
  description: "",
  duration: "",
  price: "",
  featured: false,
}

class FilmForm extends Component {
  state = {
    data: initData,
    errors: {},
  }

  componentDidMount() {
    if (this.props.film._id) {
      this.setState({data: this.props.film})
    }
  }

  static getDerivedStateFromProps(props, state) {
    const {film} = props
    const {data} = state
    if (film._id && film._id !== data._id) {
      return {
        data: film,
        errors: {},
      }
    }
    if (!film._id && data._id !== null) {
      return {
        data: initData,
        errors: {},
      }
    }
    return null
  }

  handleStringChange = ({target}) =>
    this.setState({
      data: {...this.state.data, [target.name]: target.value},
      errors: {...this.state.errors, [target.name]: ""},
    })

  handleNumberChange = ({target}) => {
    const val = target.value.replace(/\D/g, "")
    this.setState({
      data: {...this.state.data, [target.name]: Number(val)},
      errors: {...this.state.errors, [target.name]: ""},
    })
  }

  handleCheckboxChange = ({target}) =>
    this.setState({
      data: {...this.state.data, [target.name]: target.checked},
    })

  validate = data => {
    const errors = {}
    if (!data.title) errors.title = "title cannot be blank"
    if (!data.description) errors.description = "Description cannot be blank"
    if (!data.director) errors.director = "Director cannot be blank"
    if (!data.img) errors.img = "Image cannot be blank"
    if (!data.duration) errors.duration = "Duration cannot be blank"
    if (!data.price) errors.price = "Price cannot be blank"

    if (parseInt(data.duration) < 1) {
      errors.duration = "Duration cannot be negative value"
    }

    if (parseFloat(data.price) <= 0) {
      errors.price = "Price cannot be negative value"
    }
    return errors
  }

  handleSubmit = e => {
    e.preventDefault()
    const errors = this.validate(this.state.data)
    this.setState({errors})
    if (Object.keys(errors).length === 0) {
      this.props.saveFilm(this.state.data)
      this.setState({data: initData})
    }
  }

  render() {
    const {data, errors} = this.state
    return (
      <form onSubmit={this.handleSubmit} className="ui form">
        {/* ui grid START */}
        <div className="ui  grid">
          <div className="twelve wide column">
            {/* Title START  */}
            <div className={errors.title ? "field error" : "field"}>
              <label>Film title</label>
              <input
                value={data.title}
                onChange={this.handleStringChange}
                type="text"
                name="title"
                id="name"
                placeholder="film title"
              />
              <FormMessage>{errors.title}</FormMessage>
            </div>
            {/* Title END  */}

            {/* Description START  */}
            <div className={errors.description ? "field error" : "field"}>
              <label>Film description</label>
              <textarea
                value={data.description}
                onChange={this.handleStringChange}
                name="description"
                id="description"
                placeholder="film description"
              ></textarea>
              <FormMessage>{errors.description}</FormMessage>
            </div>
            {/* Description END  */}
          </div>

          {/* Image START 
          "http://via.placeholder.com/250x250"
          */}
          <div className="four wide column">
            <ReactImageFallback
              src={data.img}
              fallbackImage="http://via.placeholder.com/250x250"
              alt={data.title}
              className="ui image"
            />
          </div>

          <div className="twelve wide column">
            <div className={errors.img ? "field error" : "field"}>
              <label>Image</label>
              <input
                value={data.img}
                onChange={this.handleStringChange}
                type="text"
                name="img"
                id="img"
                placeholder="img"
              />
              <FormMessage>{errors.img}</FormMessage>
            </div>
          </div>
          {/* Image END   */}

          {/* Director START  */}
          <div className="six wide column">
            <div className={errors.director ? "field error" : "field"}>
              <label>Director</label>
              <input
                value={data.director}
                onChange={this.handleStringChange}
                type="text"
                name="director"
                id="director"
                placeholder="film director"
              />
              <FormMessage>{errors.director}</FormMessage>
            </div>
          </div>
          {/* Director END   */}

          {/* Duration START  */}
          <div className="six wide column">
            <div className={errors.duration ? "field error" : "field"}>
              <label>Duration</label>
              <input
                value={data.duration}
                onChange={this.handleNumberChange}
                type="number"
                name="duration"
                id="duration"
                placeholder="Duration"
                min={0}
              />
              <FormMessage>{errors.duration}</FormMessage>
            </div>
          </div>
          {/*  Duration END   */}

          {/* Price START  */}
          <div className="six wide column">
            <div className={errors.price ? "field error" : "field"}>
              <label>Price</label>
              <input
                value={data.price}
                onChange={this.handleNumberChange}
                type="number"
                name="price"
                id="price"
                placeholder="price"
              />
              <FormMessage>{errors.price}</FormMessage>
            </div>
          </div>
          {/*  Price END   */}

          {/* Featured START  */}
          <div className="six wide column inline field">
            <label htmlFor="featured">Featured</label>
            <input
              onChange={this.handleCheckboxChange}
              value={data.featured}
              type="checkbox"
              name="featured"
              id="featured"
              checked={data.featured}
            />
          </div>
          {/*  Featured END   */}
        </div>
        {/* ui grid END */}

        {/*  Buttons START */}

        <div className="ui fluid buttons px-3">
          <button className="ui button primary" type="submit">
            Save
          </button>
          <div className="or"></div>
          <span className="ui button" onClick={this.props.hideForm}>
            Hide form
          </span>
        </div>
        {/*  Buttons END */}
      </form>
    )
  }
}

FilmForm.propTypes = {
  hideForm: PropTypes.func.isRequired,
}

export default FilmForm
