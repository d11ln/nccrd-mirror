'use strict'

export default function ProjectsReducer(state = {}, action) {
  const { type, payload } = action
  switch(type) {
    case "UPDATE_CARDS": {
      const projects = payload.map((x) => { 
        const { ProjectId, ProjectTitle, ProjectDescription } = x
        return {
          ProjectId, ProjectTitle, ProjectDescription
        }
      })
      return { ...state, projects }
    }
  }
  return state
}