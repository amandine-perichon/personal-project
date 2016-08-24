import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import logged from './logged'
import concept from './concept'
import search from './search'
import myconcepts from './myconcepts'
import {saveToDB, updateInDB, logOut, searchConcepts, allConcepts, myConcepts} from './middleware'


const reducers = combineReducers({
  logged,
  concept,
  search,
  myconcepts
})

let store = createStore(reducers, compose(applyMiddleware(saveToDB, updateInDB, logOut, searchConcepts, allConcepts, myConcepts),
            window.devToolsExtension && window.devToolsExtension()))

export default store
