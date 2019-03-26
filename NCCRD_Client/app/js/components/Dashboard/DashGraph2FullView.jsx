import React, { Children } from 'react'
import { Row, Col, Button } from 'mdbreact'
import { connect } from 'react-redux'
import OData from 'react-odata'
import { apiBaseURL, vmsBaseURL } from '../../config/serviceURLs.js'
import { BarChart, Bar, ResponsiveContainer, Tooltip, Legend, XAxis, YAxis } from 'recharts'
import buildQuery from 'odata-query'

//images
import popin from '../../../images/popin.png'

const _gf = require('../../globalFunctions')

const mapStateToProps = (state, props) => {
  let { filterData: { statusFilter, sectorFilter, regionFilter, typologyFilter } } = state
  let { chartData: { chart2 } } = state
  let { projectData: { filteredProjectIDs } } = state
  return { statusFilter, sectorFilter, regionFilter, typologyFilter, chart2, filteredProjectIDs }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setChartData: payload => {
      dispatch({ type: "SET_CHART_2", payload })
    },
    loadProjectIDList: payload => {
      dispatch({ type: "LOAD_PROJECT_ID_LIST", payload })
    }
  }
}

class DashGraph2FullView extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.getElementById("app-content").scroll({
      top: 125,
      left: 0,
      behavior: 'smooth'
    });

    this.getChartData()
    this.getFilteredProjectIDs()
  }

  componentDidUpdate() {
    this.getFilteredProjectIDs()
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
        let res = await fetch(apiBaseURL + `MitigationEmissionsData${query}`)
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

  async getFilteredProjectIDs() {

    let { statusFilter, regionFilter, sectorFilter, typologyFilter, filteredProjectIDs, loadProjectIDList } = this.props
    let filters = {}

    if (filteredProjectIDs.length === 0) {

      //ADD FILTERS//
      //Status//
      if (statusFilter !== 0) {
        filters.status = statusFilter
      }

      //Region//
      if (regionFilter != 0) {
        filters.region = regionFilter
      }

      //Sector//
      if (sectorFilter != 0) {
        filters.sector = sectorFilter
      }

      //Typology//
      if (typologyFilter !== 0) {
        filters.typology = typologyFilter
      }

      //GET PROJECTS FILTERED//
      try {
        let res = await fetch(apiBaseURL + "Projects/Extensions.Filter?$select=ProjectId",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(filters)
          })

        let resBody = await res.json()

        if (res.ok) {
          //Process resBody
          loadProjectIDList(resBody.value.map(p => p.ProjectId))
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
        Year: i, CO2: CO2_Summed
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
          onClick={() => {
            location.hash = location.hash.replace("#/chart2", "")
          }}
        />

        <br />

        <div
          style={{
            width: "100%",
            height: "550px",
            paddingTop: "5px",
            paddingLeft: "10px",
            border: "none"
          }}
        >
          {
            (transformedData.length > 0) &&
            <ResponsiveContainer key="G2Graph" width="96%" height="98%">
              <BarChart data={transformedData} >
                <XAxis dataKey="Year" />
                <YAxis width={90} />
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
                <Legend />
              </BarChart>
            </ResponsiveContainer>
          }
        </div>
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(DashGraph2FullView)