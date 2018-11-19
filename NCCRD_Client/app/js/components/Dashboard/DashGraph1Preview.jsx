import React, { Children } from 'react'
import { Row, Col, Button } from 'mdbreact'
import { connect } from 'react-redux'
import popout from '../../../images/popout.png'
import OData from 'react-odata'
import { apiBaseURL, vmsBaseURL } from '../../config/serviceURLs.cfg'
import { LineChart, Line, ResponsiveContainer, Tooltip, Legend, XAxis, YAxis } from 'recharts'

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    setScrollPos: payload => {
      dispatch({ type: "SET_PROJECT_SCROLL", payload })
    }
  }
}

class DashGraph1Preview extends React.Component {

  constructor(props) {
    super(props);
  }

  transformData(data) {

    let tData = []

    let minYear = Math.min(...data.map(p => p.StartYear))
    let maxYear = Math.max(...data.map(p => p.EndYear))
    let currentYear = new Date().getFullYear()

    if (maxYear > currentYear) {
      maxYear = currentYear
    }

    for (let i = minYear; i <= maxYear; i++) {

      let fundedAdaptationCount = data.filter(p => p.StartYear <= i && p.EndYear >= i && p.AdaptationDetails.length > 0).length
      let fundedMitigationCount = data.filter(p => p.StartYear <= i && p.EndYear >= i && p.MitigationDetails.length > 0).length

      tData.push({
        Year: i, Adaptation: fundedAdaptationCount, Mitigation: fundedMitigationCount
      })
    }

    return tData
  }

  render() {

    return (
      <div
        style={{
          backgroundColor: "white",
          padding: "10px 10px 0px 10px",
          borderRadius: "10px",
          border: "1px solid gainsboro",
          cursor: "pointer",
        }}
      >

        <img src={popout} style={{ width: "25px", position: "absolute", top: "10px", right: "25px" }}
          onClick={() => {
            this.props.setScrollPos(window.pageYOffset)
            location.hash = "/chart1"
          }} />

        <div
          style={{
            width: "100%",
            textAlign: "center",
            marginTop: "3px",
            marginBottom: "10px",
            paddingRight: "25px",
            color: "grey",
            fontSize: "14px",
            fontWeight: "bolder"
          }}
        >
          FUNDED PROJECTS
        </div>

        <OData
          baseUrl={apiBaseURL + "Projects"}
          query={{
            select: "ProjectId, StartYear, EndYear",
            filter: {
              ProjectFunders: {
                any: [
                  { Funder: { ne: null } }
                ]
              }
            },
            expand: {
              AdaptationDetails: {
                select: ["AdaptationDetailId"]
              },
              MitigationDetails: {
                select: ["MitigationDetailId"]
              }
            }
          }}
        >
          {({ loading, error, data }) => {

            let contents = []

            if (loading) {
              contents.push(
                <div key="G1Loading" style={{ textAlign: "center", color: "grey", paddingTop: "35px", fontSize: "14px", }}>
                  <b>
                    <i>
                      LOADING...
                    </i>
                  </b>
                </div>
              )
            }

            if (error) {
              console.error(error)
              contents.push(
                <div key="G1Error" style={{ textAlign: "center", color: "grey", paddingTop: "35px", fontSize: "14px", }}>
                  <b>
                    <i>
                      ERROR
                      <br />
                      (See log)
                    </i>
                  </b>
                </div>
              )
            }

            if (data && data.value) {
              let transformedData = this.transformData(data.value)
              if (transformedData.length > 0) {
                contents.push(
                  <ResponsiveContainer key="G1Graph" width="100%" height="100%">
                    <LineChart data={transformedData} >
                      <XAxis hide dataKey="Year" />
                      <Line dot={false} type='monotone' dataKey='Adaptation' stroke='#8884d8' strokeWidth={2} />
                      <Line dot={false} type="monotone" dataKey="Mitigation" stroke="#82ca9d" strokeWidth={2} />
                      <Tooltip />
                    </LineChart>
                  </ResponsiveContainer>
                )
              }
            }

            return (
              <div
                style={{
                  width: "100%",
                  height: "130px",
                  margin: "0px",
                  border: "none",
                  paddingBottom: "10px"
                }}
              >
                {contents}
              </div>
            )

          }}
        </OData>
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(DashGraph1Preview)