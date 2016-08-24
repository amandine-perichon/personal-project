import store from './index'
import request from 'superagent'

export const saveToDB = store => next => action => {
  if (action.type === "CREATE_CONCEPT_REQUESTED") {
    request
      .post('/concept')
      .send({"title": "", "description": "", "diagram": []})
      .end((err, res) => {
        if (err) {
          console.log(err)
        } else {
          store.dispatch({ type: "CREATE_CONCEPT_SUCCEEDED", concept: res.body})
        }
      })
  }
  return next(action)
}

export const updateInDB = store => next => action => {
  if (action.type === "UPDATE_CONCEPT_REQUEST") {
    request
      .put('/concept')
      .send(store.getState().concept)
      .end((err, res) => {
        if (err) {
          console.log(err)
        } else {
          store.dispatch({ type: "UPDATE_CONCEPT_SUCCEEDED"})
        }
      })
  }
  return next(action)
}

export const logOut = store => next => action => {
  if (action.type === "LOGOUT") {
    request
      .get('/logout')
      .end((err, res) => {
        if (err) {
          console.log(err)
        } else {
          store.dispatch({ type: "UPDATE_CONCEPT_SUCCEEDED"})
        }
      })
  }
  return next(action)
}
