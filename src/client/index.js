import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, hashHistory} from 'react-router'

import store from './store'
import CreateHeader from './components/CreateHeader'
import CreateDiagram from './components/CreateDiagram'
import DiagramList from './components/DiagramList'
import RegisterForm from './components/RegisterForm'
import Search from './components/Search'

refresh()
store.subscribe(refresh)

function refresh() {
  ReactDOM.render(
    <Router history={hashHistory}>
      <Route component={CreateHeader}>
        <Route path='/' component={Search} />
        <Route path='/register' component={RegisterForm} />
        <Route path='/mydiagrams' component={DiagramList}/>
        <Route path='/create' component={CreateDiagram}/>
      </Route>
    </Router>,
    document.getElementById('app'))
}
