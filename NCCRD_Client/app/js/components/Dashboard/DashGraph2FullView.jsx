import React, { Children } from 'react'
import { Row, Col, Button } from 'mdbreact'
import { connect } from 'react-redux'
import OData from 'react-odata'
import { apiBaseURL, vmsBaseURL } from '../../config/serviceURLs.cfg'
import { BarChart, Bar, ResponsiveContainer, Tooltip, Legend, XAxis, YAxis } from 'recharts'

//images
import popin from '../../../images/popin.png'

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

class DashGraph2FullView extends React.Component {

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

    let minYear = Math.min(...data.map(p => p.Year))
    let maxYear = Math.max(...data.map(p => p.Year))
    let currentYear = new Date().getFullYear()

    if (maxYear > currentYear) {
      maxYear = currentYear
    }

    for (let i = minYear; i <= maxYear; i++) {

      let CO2_Summed = data.filter(p => p.Year === i).map(p => p.CO2).reduce((a, b) => a + b, 0)
      CO2_Summed = Math.round(CO2_Summed * 10) / 10

      tData.push({
        Year: i, CO2: CO2_Summed
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
          CO2 REDUCTION PER YEAR
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

        <br />

        <OData
          baseUrl={apiBaseURL + "MitigationEmissionsData"}
          query={{
            select: ["MitigationEmissionsDataId", "Year", "CO2"],
            filter: {
              CO2: { gt: 0 }
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
                  <ResponsiveContainer key="G2Graph" width="96%" height="98%">
                    <BarChart data={transformedData} >
                      <XAxis dataKey="Year" />
                      <YAxis width={90} />
                      <Bar dataKey='CO2' fill='#82CA9D' />
                      <Tooltip content={(payload, label) => {
                        return (
                          <div style={{ backgroundColor: "white", padding: "10px", border: "1px solid gainsboro" }}>
                            {
                              payload.active &&
                              <div>
                                <p className="label" style={{ marginBottom: "5px" }}>
                                  {payload.label}
                                </p>
                                <p style={{ color: payload.payload[0].stroke }}>
                                  CO2: {payload.payload[0].value} (Tons)
                                </p>
                              </div>
                            }
                          </div>
                        )
                      }}
                      />
                      <Legend />
                    </BarChart>
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
                  paddingLeft: "10px",
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


export default connect(mapStateToProps, mapDispatchToProps)(DashGraph2FullView)