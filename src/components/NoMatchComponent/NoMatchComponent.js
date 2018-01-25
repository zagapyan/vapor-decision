import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './NoMatchComponent.css'

class NoMatchComponent extends Component {
  constructor(props) {
    super(props)
  }
  null
  render() {
    return (
      <div className="NoMatchComponent">
        <h1>NoMatchComponent</h1>
      </div>
    );
  }
}

NoMatchComponent.propTypes = {}

NoMatchComponent.defaultProps = {}

export default NoMatchComponent
