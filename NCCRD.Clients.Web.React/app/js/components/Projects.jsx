'use strict'

import React from 'react'
import ProjectList from './ProjectList.jsx'
import ProjectFilters from './ProjectFilters.jsx'
import { connect } from 'react-redux'
import { BeatLoader } from 'react-spinners';

const mapStateToProps = (state, props) => {
    let { loadingData: { loading } } = state
    return { loading }
}

class Projects extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>

                <div
                    hidden={!this.props.loading}
                    className="card"
                    style={{ position: "fixed", right: "40%", bottom: "42%", zIndex: "99", background: "#5499c7" }}>
                    
                    <div className="card-body" style={{ margin: "30px 80px 30px 80px"}}>
                        <label style={{ fontSize: "x-large", fontWeight: "bold", color: "#f8f9f9" }}>LOADING</label>
                        <BeatLoader
                            color={' #a9cce3 '}
                            size={30}
                            loading={this.props.loading}
                        />
                    </div>
                </div>

                <ProjectFilters />
                <ProjectList />
            </div>
        )
    }
}

export default connect(mapStateToProps)(Projects)