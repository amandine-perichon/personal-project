import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, hashHistory} from 'react-router'

import store from './store'
import Header from './components/Header'
import Home from './components/Home'
import CreateDiagram from './components/CreateDiagram'

refresh()
store.subscribe(refresh)

function refresh() {
  ReactDOM.render(
    <Router history={hashHistory}>
      <Route component={Header}>
        <Route path='/' component={Home} />
        <Route path='/diagrams' component={CreateDiagram}/>
        <Route path='/create' component={CreateDiagram}/>
      </Route>
    </Router>,
    document.getElementById('app'))
}
