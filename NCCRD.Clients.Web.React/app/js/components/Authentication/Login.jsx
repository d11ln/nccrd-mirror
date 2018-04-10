'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { BeatLoader } from 'react-spinners'
import { Button, Input } from 'mdbreact'
import * as ACTION_TYPES from "../../constants/action-types"

const mapStateToProps = (state, props) => {
    let { globalData: { loading } } = state
    return { loading }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLoading: payload => {
            dispatch({ type: ACTION_TYPES.SET_LOADING, payload })
        }
    }
}

class Login extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.setLoading(false)
    }

    render() {

        return (
            <>

                <div className="container-fluid">
                    <div className="row">
                        <div
                            hidden={!this.props.loading}
                            className="card"
                            style={{ position: "fixed", right: "40%", bottom: "42%", zIndex: "99" }}>

                            <div className="card-body" style={{ margin: "30px 80px 30px 80px" }}>
                                <label style={{ fontSize: "x-large", fontWeight: "bold", color: "#4285F4" }}>LOADING</label>
                                <BeatLoader
                                    color={'#4285F4'}
                                    size={30}
                                    loading={this.props.loading}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row" style={{ marginTop: "10%" }}>

                    <div className="col-md-4">
                    </div>

                    <div className="col-md-4">
                        <h2>Login</h2>
                        <br/>
                        <br/>
                        <div style={{ marginLeft: "3px" }}>
                            <Input size="sm" label="Email" icon="envelope" group type="email" validate error="wrong" success="right" />
                            <Input size="sm" label="Password" icon="lock" group type="password" validate />
                            <Button size="sm" style={{ float: "right", marginRight: "13px" }}>Login</Button>
                        </div>
                    </div>
                </div>

                {/* <br/> */}
                {/* Third party login providers */}
                {/* <div className="row mt-2 mb-3 d-flex justify-content-center">
                    <a className="fa-lg p-2 m-2 fb-ic"><i className="fa fa-facebook white-text fa-lg"> </i></a>
                    <a className="fa-lg p-2 m-2 tw-ic"><i className="fa fa-twitter white-text fa-lg"> </i></a>
                    <a className="fa-lg p-2 m-2 gplus-ic"><i className="fa fa-google-plus white-text fa-lg"> </i></a>
                </div> */}

            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)