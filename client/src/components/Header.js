import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTyps from 'prop-types'
import { connect } from 'react-redux'

class Header extends Component {
  render() {
    return (
      <nav>
        <div>
          <Link to="/">SmartLink</Link>
        </div>
        <div>
          <ul>
            <li>
              <Link to="/register">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Header
