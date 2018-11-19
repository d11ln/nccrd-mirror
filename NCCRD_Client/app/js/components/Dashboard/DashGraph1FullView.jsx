import React, { Children } from 'react'
import { Row, Col, Button } from 'mdbreact'
import { connect } from 'react-redux'
import OData from 'react-odata'
import { apiBaseURL, vmsBaseURL } from '../../config/serviceURLs.cfg'
import { LineChart, Line, ResponsiveContainer, Tooltip, Legend, XAxis, YAxis } from 'recharts'

//images
import popin from '../../../images/popin.png'

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

class DashGraph1FullView extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scroll({
      top: 125,
      left: 0,
      behavior: 'smooth'
    });
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
        }}
      >

        <div
          style={{
            width: "95%",
            textAlign: "center",
            marginTop: "3px",
            marginBottom: "10px",
            paddingRight: "25px",
            color: "grey",
            fontSize: "14px",
            fontWeight: "bolder",
            display: "inline",
            float: "left"
          }}
        >
          FUNDED PROJECTS PER YEAR PER ADAPTATION / MITIGATION
        </div>
    
        <img
          src={popin}
          style={{
            width: "25px",
            cursor: "pointer",
            float: "right", 
            display: "inline"
          }}
          onClick={() => { location.hash = "" }}
        />

        <br/>

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
                  <ResponsiveContainer key="G1Graph" width="96%" height="98%">
                    <LineChart data={transformedData} >
                      <XAxis dataKey="Year" />
                      <YAxis />
                      <Line type='monotone' dataKey='Adaptation' stroke='#8884d8' strokeWidth={2} />
                      <Line type="monotone" dataKey="Mitigation" stroke="#82ca9d" strokeWidth={2} />
                      <Tooltip />
                      <Legend />
                    </LineChart>
                  </ResponsiveContainer>
                )
              }
            }

            return (
              <div
                style={{
                  width: "100%",
                  height: "550px",
                  paddingTop: "5px",
                  paddingLeft: "0px",
                  border: "none"
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


export default connect(mapStateToProps, mapDispatchToProps)(DashGraph1FullView)