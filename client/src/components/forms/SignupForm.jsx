import React from "react"
import { Link } from "react-router-dom"
import isEmail from 'validator/es/lib/isEmail'
import equals from 'validator/es/lib/equals'
import FormMessage from "./FormMessage"

const initialData = {
  email: "",
  password: "",
  passwordConfirmation: "",
}

class SignupForm extends React.Component {
  state = {
    data: initialData,
    errors: {},
    loading: false,
  }
  handleChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
      errors: { ...this.state.errors, [e.target.name]: "" },
    })

  handleSubmit = e => {
    e.preventDefault()
    const errors = this.validate(this.state.data)
    this.setState({ errors })
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true })
      this.props
        .submit(this.state.data)
        .catch(error =>
          this.setState({ errors: error.response.data.errors, loading: false }),
        )
    }
  }

  validate(data) {
    const errors = {}
    if (!data.email) errors.email = "Email cannot be blank"
    if (!isEmail(data.email)) errors.email = "Email is not correct"
    if (!data.password) errors.password = "Password cannot be blank"
    if (!data.passwordConfirmation)
      errors.passwordConfirmation = "Password confirmation cannot be blank"
    if (!equals(data.password, data.passwordConfirmation))
      errors.password = "Password is not equals to password confirmation"

    return errors
  }

  render() {
    const { data, errors, loading } = this.state
    const cls = loading ? "ui form loading" : "ui form"
    return (
      <form className={cls} onSubmit={this.handleSubmit}>
        <div className={errors.email ? "error field" : "field"}>
          <label>Email</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            value={data.email}
            onChange={this.handleChange}
          />
          <FormMessage>{errors.email}</FormMessage>
        </div>

        <div className={errors.password ? "error field" : "field"}>
          <label>Password</label>
          <input
            type="text"
            name="password"
            id="password"
            placeholder="password"
            value={data.password}
            onChange={this.handleChange}
          />
          <FormMessage>{errors.password}</FormMessage>
        </div>

        <div className={errors.passwordConfirmation ? "error field" : "field"}>
          <label>Password Confirmation</label>
          <input
            type="text"
            name="passwordConfirmation"
            id="passwordConfirmation"
            placeholder="password confirmation"
            value={data.passwordConfirmation}
            onChange={this.handleChange}
          />
          <FormMessage>{errors.passwordConfirmation}</FormMessage>
        </div>

        <div className="ui fluid buttons">
          <button className="ui button primary">Sing Up</button>

          <div className="or" />

          <Link to="/" className="ui button">
            Cancel
          </Link>
        </div>
      </form>
    )
  }
}

export default SignupForm
