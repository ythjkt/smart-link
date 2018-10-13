import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom' // Adds history to props
import PropTypes from 'prop-types'

import { registerUser } from '../actions/authActions'

import TextFormInput from './common/TextFormInput'

class Register extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      password2: '',
      errors: {}
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentWillReceiveProps(newProps) {
    if (newProps) {
      this.setState({
        errors: newProps.errors
      })
    }
  }

  onSubmit(e) {
    e.preventDefault()

    const newUser = {
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }

    this.props.registerUser(newUser)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { errors } = this.state

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <TextFormInput
            placeholder="Email Address"
            name="email"
            value={this.state.email}
            error={errors.email}
            onChange={this.onChange}
          />
          <TextFormInput
            placeholder="Password"
            name="password"
            value={this.state.password}
            error={errors.password}
            onChange={this.onChange}
          />
          <TextFormInput
            placeholder="Confirm Password"
            name="password2"
            value={this.state.password2}
            error={errors.password2}
            onChange={this.onChange}
          />
          <input type="submit" />
        </form>
      </div>
    )
  }
}

Register.proptypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register))
