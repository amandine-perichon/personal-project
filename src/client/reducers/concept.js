const concept = function (state = {"_id": "", "title": "", "description": "", "diagram": []},
                                action) {
    switch(action.type) {
      case 'UPDATE_DIAGRAM':
        return Object.assign({}, state, {diagram: action.diagram})
      case 'UPDATE_TITLE':
        return Object.assign({}, state, {title: action.title})
      case 'UPDATE_DESCRIPTION':
        return Object.assign({}, state, {description: action.description})
      case 'CREATE_CONCEPT_SUCCEEDED':
        return action.concept

      default:
        return state
  }
}

export default concept
