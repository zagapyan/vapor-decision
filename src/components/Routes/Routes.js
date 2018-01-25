import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import IndexComponent from '../IndexComponent'
import NoMatchComponent from '../NoMatchComponent'
import LoginComponent from '../LoginComponent'
import styles from './Routes.css'

class Routes extends Component {
    constructor(props) {
        super(props)
    }
    null
    render() {
        return (
            <div className="Routes">
              <Switch>
                <Route exact path="/" component={IndexComponent}/>
                <Route exact path="/login" component={LoginComponent}/>
                <Route component={NoMatchComponent} />                
              </Switch>
            </div>
        );
    }
}

Routes.propTypes = {}

Routes.defaultProps = {}

export default Routes
