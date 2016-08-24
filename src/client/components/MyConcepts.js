import React from 'react'
import request from 'superagent'
import DiagramView from './DiagramView'
import store from '../reducers'

export default React.createClass({
  componentDidMount () {
    store.dispatch({type: 'GET_MY_CONCEPTS_REQUEST'})
  },
  render () {
    return (
      <div className="diagram-view">
        <DiagramView concepts={store.getState().myconcepts} />
      </div>
    )
  }
})
