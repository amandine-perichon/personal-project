import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import logged from './logged'
import concept from './concept'
import {saveToDB, updateInDB, logOut} from './middleware'


const reducers = combineReducers({
  logged,
  concept
})

let store = createStore(reducers, compose(applyMiddleware(saveToDB, updateInDB, logOut),
            window.devToolsExtension && window.devToolsExtension()))

export default store
