import React from 'react'
import store from '../reducers'
import Header from './Header'

export default React.createClass({
  render () {
    return <Header logged={store.getState().logged}>{this.props.children}</Header>
  }
})
