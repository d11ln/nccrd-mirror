import React, { Children } from 'react'
import { Row, Col, Button } from 'mdbreact'
import { connect } from 'react-redux'
import popout from '../../../images/popout.png'
import OData from 'react-odata'
import { apiBaseURL, vmsBaseURL } from '../../config/serviceURLs.js'
import { BarChart, Bar, ResponsiveContainer, Tooltip, Legend, XAxis, YAxis } from 'recharts'
import buildQuery from 'odata-query'
import { CustomFetch } from '../../globalFunctions';

const _gf = require('../../globalFunctions')

const mapStateToProps = (state, props) => {
  let { filterData: { statusFilter, sectorFilter, regionFilter, typologyFilter } } = state
  let { chartData: { chart2 } } = state
  let { projectData: { filteredProjectIDs } } = state
  return { statusFilter, sectorFilter, regionFilter, typologyFilter, chart2, filteredProjectIDs }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setScrollPos: payload => {
      dispatch({ type: "SET_PROJECT_SCROLL", payload })
    },
    setChartData: payload => {
      dispatch({ type: "SET_CHART_2", payload })
    }
  }
}

class DashGraph2Preview extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getChartData()
  }

  async getChartData() {

    if (this.props.chart2.length === 0) {

      const query = buildQuery({
        select: ["MitigationEmissionsDataId", "Year", "CO2"],
        filter: {
          CO2: { gt: 0 }
        },
        expand: {
          Project: {
            select: ["ProjectId"]
          }
        }
      })

      try {
        let res = await CustomFetch(apiBaseURL + `MitigationEmissionsData${query}`)
        let resBody = await res.json()

        if (res.ok && resBody.value) {
          //Process resBody
          this.props.setChartData(resBody.value)
        }
        else {
          throw new Error(resBody.error.message)
        }
      }
      catch (ex) {
        console.error(ex)
      }
    }
  }

  transformData(data) {

    let tData = []

    let minYear = Math.min(...data.filter(p => p.Year > 0).map(p => p.Year))
    let maxYear = Math.max(...data.filter(p => p.Year > 0).map(p => p.Year))
    let currentYear = new Date().getFullYear()

    if (maxYear > currentYear) {
      maxYear = currentYear
    }

    for (let i = minYear; i <= maxYear; i++) {

      let CO2_Summed = data.filter(p => p.Year === i).map(p => p.CO2).reduce((a, b) => a + b, 0)
      CO2_Summed = Math.round(CO2_Summed * 10) / 10

      tData.push({
        Year: i, CO2: CO2_Summed, Text: "CO2 (Tons)"
      })
    }

    return tData
  }

  render() {

    let { chart2, filteredProjectIDs } = this.props
    let filteredData = chart2.filter(p => filteredProjectIDs.includes(p.Project.ProjectId))
    let transformedData = this.transformData(filteredData)

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
            this.props.setScrollPos(document.getElementById("app-content").scrollTop)
            location.hash = location.hash.replace("#/", "#/chart2")
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
          CO2 REDUCTION
        </div>

        <div
          style={{
            width: "100%",
            height: "130px",
            margin: "0px",
            border: "none",
            paddingBottom: "10px"
          }}
        >
          {
            (transformedData.length > 0) &&
            <ResponsiveContainer key="G2Graph" width="100%" height="100%">
              <BarChart data={transformedData} >
                <XAxis hide dataKey="Year" />
                <Bar dataKey='CO2' fill='#82CA9D' />
                <Tooltip content={(params) => {
                  let { payload, label, active } = params
                  if (payload && label && active) {
                    return (
                      <div style={{ backgroundColor: "white", padding: "10px", border: "1px solid gainsboro" }}>
                        {
                          active &&
                          <div>
                            <p className="label" style={{ marginBottom: "5px" }}>
                              {label}
                            </p>
                            <p style={{ color: payload[0].stroke }}>
                              CO2: {payload[0].value} (Tons)
                                </p>
                          </div>
                        }
                      </div>
                    )
                  }
                }} />
              </BarChart>
            </ResponsiveContainer>
          }
        </div>
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(DashGraph2Preview)