const search = function (state = [],
                                action) {
    switch(action.type) {
      case 'UPDATE_SEARCH_SUCCEEDED':
        return action.concepts
      case "GET_ALL_CONCEPTS_SUCCEEDED":
        return action.concepts
      case 'LOGOUT':
        return []
        
      default:
        return state
  }
}

export default search
