import React from 'react'
import { Row, Col, Button, Input, Card, CardBody, CardText } from 'mdbreact'
import { connect } from 'react-redux'
import TextComponent from '../../Shared/TextComponent.jsx'
import { ccisBaseURL } from '../../../config/serviceURLs.cfg'
import OData from 'react-odata'
import { DEAGreen } from '../../../config/colours.cfg'

const mapStateToProps = (state, props) => {
  let user = state.oidc.user
  let { globalData: { editMode } } = state
  return { user, editMode }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setEditMode: payload => {
      dispatch({ type: "SET_EDIT_MODE", payload })
    }
  }
}

class LinkedDAO extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let { LinkedDAOGoalId, user, linkCallback, editMode, setEditMode } = this.props

    return (
      <>
        {/* LINKED */}
        {
          (LinkedDAOGoalId !== "00000000-0000-0000-0000-000000000000") &&
          <div>

            {(editMode && (user && !user.expired)) &&
              <Button
                color=""
                style={{ backgroundColor: DEAGreen, marginLeft: "-1px", marginBottom: "20px" }}
                onClick={() => {
                  if (linkCallback) {
                    setTimeout(linkCallback("00000000-0000-0000-0000-000000000000"), 1000)
                  }
                }}>
                Unlink
              </Button>
            }

            <OData
              baseUrl={ccisBaseURL + `Goal1?$filter=Id eq ${LinkedDAOGoalId}`}
            >
              {({ loading, error, data }) => {

                if (loading) {
                  return (
                    <h6>
                      Fetching your goals...
                    </h6>
                  )
                }

                if (error) {
                  console.error(error)
                  return (
                    <p>
                      Unable to fetch goals. (See log for details)
                    </p>
                  )
                }

                if (data) {

                  let goalDetails = []

                  if (data.value.length === 0) {
                    goalDetails.push(
                      <p key={"msg_nf_001"}>
                        Goal details not found.
                    </p>
                    )
                    goalDetails.push(
                      <p key={"msg_nf_002"}>
                        <i>
                          This is normal if you have not submitted your DAO Goal yet.
                          Once your Goal has successfully been submitted its details will become available here.
                        </i>
                      </p>
                    )
                    goalDetails.push(
                      <p key={"msg_nf_003"}>
                        <i>
                          If you have already submitted your DAO Goal and you keep getting this message, 
                          please contact the site administrator for assistance.
                        </i>
                      </p>
                    )
                  }
                  else {
                    goalDetails.push(
                      <p key="docLink" style={{ marginBottom: "10px" }}>
                        <b>Document Link:</b><br />{data.value[0].DocumentLink}
                      </p>
                    )
                    goalDetails.push(
                      <p key="hasAssessment" style={{ marginBottom: "10px" }}>
                        <b>Has Assessment:</b> {data.value[0].HasAssessment === 1 ? "Yes" : "No"}
                      </p>
                    )
                    goalDetails.push(
                      <p key="docLastUpdated" style={{ marginBottom: "10px" }}>
                        <b>Document Last Updated:</b> {data.value[0].DocLastUpdated}
                      </p>
                    )
                    goalDetails.push(
                      <p key="created" style={{ marginBottom: "10px" }}>
                        <b>Goal Created:</b> {data.value[0].Created}
                      </p>
                    )
                    goalDetails.push(
                      <p key="lastUpdated" style={{ marginBottom: "10px" }}>
                        <b>Goal Last Updated:</b> {
                          data.value[0].LastUpdated === null ? data.value[0].Created : data.value[0].LastUpdated
                        }
                      </p>
                    )

                  }

                  return goalDetails
                }

              }}
            </OData>

            {(!editMode && (user && !user.expired)) &&
              <div>
                <hr />
                <b>
                  <i>
                    Enable
                    &nbsp;
                  <span style={{ color: "blue", cursor: "pointer" }} onClick={() => { setEditMode(true) }}>
                      EDIT-MODE
                  </span>
                    &nbsp;
                    to allow editing
                  </i>
                </b>
              </div>
            }

            {(!user || user.expires) &&
              <div>
                <hr />
                <b><i><a href="#/login">Login</a> to allow editing</i></b>
              </div>
            }

          </div>
        }

        {/* NOT LINKED */}
        {(LinkedDAOGoalId === "00000000-0000-0000-0000-000000000000") &&

          <div>

            {(!user || user.expires) &&
              <b><i><a href="#/login">Login</a> to allow editing</i></b>
            }

            {(!editMode && (user && !user.expired)) &&
              <b>
                <i>
                  Enable
                  &nbsp;
                  <span style={{ color: "blue", cursor: "pointer" }} onClick={() => { setEditMode(true) }}>
                    EDIT-MODE
                  </span>
                  &nbsp;
                  to allow editing
                </i>
              </b>
            }

            {editMode &&
              <div>
                <h5 style={{ marginBottom: "15px", fontWeight: "bold" }}>
                  Search for DAO:
                </h5>

                <h5 style={{ fontWeight: "400", marginBottom: "15px" }}>
                  Recently added goals (top 25):
                </h5>

                <OData
                  baseUrl={ccisBaseURL + "Goal1"}
                  query={{
                    top: 25,
                    select: ['Id', 'Created', 'LastUpdated'],
                    orderBy: ["Created DESC"]
                  }}
                >
                  {({ loading, error, data }) => {

                    if (loading) {
                      return (
                        <h6>
                          Fetching your goals...
                    </h6>
                      )
                    }

                    if (error) {
                      console.error(error)
                      return (
                        <p>
                          Unable to fetch goals. (See log for details)
                    </p>
                      )
                    }

                    if (data) {
                      let yourGoals = []

                      if (data.value.length === 0) {
                        yourGoals.push(
                          <p key={new Date().valueOf()}>
                            No goals found.
                      </p>
                        )
                      }
                      else {
                        data.value.forEach(item => {
                          yourGoals.push(
                            <Card key={item.Id} style={{ marginBottom: "10px", backgroundColor: "whitesmoke", border: "1px solid gainsboro" }}>
                              <CardBody>
                                <CardText>
                                  <b>Created on: </b>{item.Created}
                                  <br />
                                  <b>Last updated on: </b>{item.LastUpdated === null ? item.Created : item.LastUpdated}
                                </CardText>
                                <Button
                                  size="sm"
                                  color=""
                                  style={{ backgroundColor: DEAGreen, marginLeft: "0px" }}
                                  onClick={() => {
                                    if (linkCallback) {
                                      setTimeout(linkCallback(item.Id), 1000)
                                    }
                                  }}>
                                  Link
                            </Button>
                              </CardBody>
                            </Card>
                          )
                        })
                      }

                      return yourGoals
                    }

                  }}
                </OData>

                <br />
                <h5 style={{ fontWeight: "400", marginBottom: "15px" }}>
                  Your goals:
            </h5>

                <OData
                  baseUrl={ccisBaseURL + "Goal1"}
                  query={{
                    filter: { CreateUserId: user ? user.profile.UserId : "" },
                    select: ['Id', 'Created', 'LastUpdated'],
                    orderBy: ["Created DESC"]
                  }}
                >
                  {({ loading, error, data }) => {

                    if (loading) {
                      return (
                        <h6>
                          Fetching your goals...
                    </h6>
                      )
                    }

                    if (error) {
                      console.error(error)
                      return (
                        <p>
                          Unable to fetch goals. (See log for details)
                    </p>
                      )
                    }

                    if (data) {
                      let yourGoals = []

                      if (data.value.length === 0) {
                        yourGoals.push(
                          <p key={new Date().valueOf()}>
                            You have not submitted any goals.
                      </p>
                        )
                      }
                      else {
                        data.value.forEach(item => {
                          yourGoals.push(
                            <Card key={item.Id} style={{ marginBottom: "10px", backgroundColor: "whitesmoke", border: "1px solid gainsboro" }}>
                              <CardBody>
                                <CardText>
                                  <b>Created on: </b>{item.Created}
                                  <br />
                                  <b>Last updated on: </b>{item.LastUpdated === null ? item.Created : item.LastUpdated}
                                </CardText>
                                <Button
                                  size="sm"
                                  color=""
                                  style={{ backgroundColor: DEAGreen, marginLeft: "0px" }}
                                  onClick={() => {
                                    if (linkCallback) {
                                      linkCallback(item.Id)
                                    }
                                  }}>
                                  Link
                            </Button>
                              </CardBody>
                            </Card>
                          )
                        })
                      }

                      return yourGoals
                    }

                  }}
                </OData>
              </div>
            }
          </div>
        }

      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkedDAO)