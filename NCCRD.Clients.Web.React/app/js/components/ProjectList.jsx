'use strict'

import React from 'react'
import ProjectCard from './ProjectCard.jsx';
import { connect } from 'react-redux'

const mapStateToProps = (state, props) => {
  let { projects } = state
  return { projects }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCards: payload => {
      dispatch({type: 'UPDATE_CARDS', payload})
    }
  }
}

class ProjectList extends React.Component {

    constructor(props) {
        super(props);
        
    }
    
    componentDidMount() {
      let{ updateCards } = this.props
      fetch('http://localhost:58683/api/Projects/GetAll', {
        headers: {
        "Content-Type": "application/json"
      }}).then(res => res.json()).then(res => {
        updateCards(res)
      })
    }

    test() {
      const { projects } = this.props
      let ar = []
      console.log( projects.projects)
      if(typeof projects.projects !== 'undefined') {
        for(let i of projects.projects) {
          ar.push(<ProjectCard pId={i.ProjectId} ptitle={i.ProjectTitle} pdes={i.ProjectDescription}/>)
        }
        return ar
      }
      return <div/>
    }
    render() {
        return (
          this.test()
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList)