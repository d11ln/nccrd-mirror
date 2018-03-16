'use strict'

import ProjectsReducer from './ProjectsReducer'
import LookupsReducer from './LookupsReducer'
import FilterReducer from './FilterReducer'


export default {
    projectData: ProjectsReducer,
    lookupData: LookupsReducer,
    filterData: FilterReducer
}