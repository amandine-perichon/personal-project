import {createStore, applyMiddleware, compose} from 'redux'
import request from 'superagent'

const logged = function (state = {status: false, username: ""}, action) {
    switch(action.type) {
      case 'LOGIN':
        return {status: true, username: action.username}
      case 'REGISTER':
          return {status: true, username: action.username}
      case 'LOGOUT':
        return {status: false, username: ""}
    default:
      return state
  }
}

export default logged
