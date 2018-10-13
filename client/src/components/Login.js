import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom' // Adds history to props
import PropTypes from 'prop-types'

import { loginUser } from '../actions/authActions'

import TextFormInput from './common/TextFormInput'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      errors: {}
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }

    if (nextProps) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  onSubmit(e) {
    e.preventDefault()

    const userData = {
      email: this.state.email,
      password: this.state.password
    }

    this.props.loginUser(userData)
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
            type="password"
            name="password"
            value={this.state.password}
            error={errors.password}
            onChange={this.onChange}
          />
          <input type="submit" />
        </form>
      </div>
    )
  }
}

Login.proptypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login))
