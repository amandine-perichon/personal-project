const myconcepts = function (state = [],
                                action) {
    switch(action.type) {
      case "GET_MY_CONCEPTS_SUCCEEDED":
        return action.concepts
      case 'LOGOUT':
        return []

      default:
        return state
  }
}

export default myconcepts
