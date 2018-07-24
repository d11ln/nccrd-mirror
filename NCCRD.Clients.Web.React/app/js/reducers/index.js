'use strict'

import GlobalReducer from './GlobalReducer'
import ProjectsReducer from './ProjectsReducer'
import AdaptationsReducer from './AdaptationsReducer'
import MitigationsReducer from './MitigationsReducer'
import EmissionsReducer from './EmissionsReducer'
import ResearchReducer from './ResearchReducer'
import LookupsReducer from './LookupsReducer'
import FilterReducer from './FilterReducer'
import EditListModalReducer from './EditListModalReducer'
import NavigationReducer from './NavigationReducer'

export default {
    globalData: GlobalReducer,
    projectData: ProjectsReducer,
    adaptationData: AdaptationsReducer,
    mitigationData: MitigationsReducer,
    emissionData: EmissionsReducer,
    researchData: ResearchReducer ,
    lookupData: LookupsReducer,
    filterData: FilterReducer,
    editListModalData: EditListModalReducer,
    navigation: NavigationReducer
}