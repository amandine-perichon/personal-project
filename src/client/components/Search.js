import React from 'react'
import request from 'superagent'
import DiagramView from './DiagramView'

export default React.createClass({
  getInitialState () {
    return {
      concepts: []
    }
  },
  componentDidMount () {
    console.log('componentDidMount')
    request
      .get('/concepts')
      .end((err, res) => {
        this.setState({concepts: res.body})
      })
  },
  searchConcepts (evt) {
    if (evt.keyCode === 13) {
      console.log('searchConcepts')
      request
        .get('/searchconcepts?keyword=' + evt.target.value)
        .end((err, res) => {
          this.setState({concepts: res.body})
        })
    }
  },
  render () {
    return (
      <div className="diagram-view">
          <div className="search">
          <input type="text"
                name="keyword"
                placeholder="Search"
                onKeyUp={this.searchConcepts}/>
          </div>
        <DiagramView concepts={this.state.concepts} />
      </div>
    )
  }
})
