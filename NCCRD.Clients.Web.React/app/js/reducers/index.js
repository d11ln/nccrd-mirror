'use strict'

import ProjectsReducer from './ProjectsReducer'
import LookupsReducer from './LookupsReducer'
import FilterReducer from './FilterReducer'
import LoadingReducer from './LoadingReducer'


export default {
    projectData: ProjectsReducer,
    lookupData: LookupsReducer,
    filterData: FilterReducer,
    loadingData: LoadingReducer,
}