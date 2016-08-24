import React from 'react'
import request from 'superagent'
import DiagramView from './DiagramView'
import store from '../reducers'

export default React.createClass({
  componentDidMount () {
    store.dispatch({type: 'GET_ALL_CONCEPTS_REQUEST'})
  },
  searchConcepts (evt) {
    if (evt.keyCode === 13) {
      if (evt.target.value !== '') {
        store.dispatch({type: 'UPDATE_SEARCH_REQUEST', keyword: evt.target.value})
      } else {
        store.dispatch({type: 'GET_ALL_CONCEPTS_REQUEST'})
      }
    }
  },
  render () {
    return (
      <div className="diagram-view">
          <div className="search">
          <input type="text"
                name="keyword"
                placeholder="Search"
                onKeyUp={this.searchConcepts}/>
          </div>
        <DiagramView concepts={store.getState().search} />
      </div>
    )
  }
})
