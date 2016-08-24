const myconcepts = function (state = [],
                                action) {
    switch(action.type) {
      case "GET_MY_CONCEPTS_SUCCEEDED":
        return action.concepts
      default:
        return state
  }
}

export default myconcepts
