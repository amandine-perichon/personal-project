import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, hashHistory} from 'react-router'

import store from './store'
import Header from './components/Header'
import CreateDiagram from './components/CreateDiagram'
import DiagramList from './components/DiagramList'

refresh()
store.subscribe(refresh)

function refresh() {
  ReactDOM.render(
    <Router history={hashHistory}>
      <Route component={Header}>
        <Route path='/' component={DiagramList} />
        <Route path='/mydiagrams' component={DiagramList}/>
        <Route path='/create' component={CreateDiagram}/>
      </Route>
    </Router>,
    document.getElementById('app'))
}
