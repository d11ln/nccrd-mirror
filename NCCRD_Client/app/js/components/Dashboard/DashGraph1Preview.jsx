import React from 'react'
import { connect } from 'react-redux'
import popout from '../../../images/popout.png'
import OData from 'react-odata'
import { apiBaseURL } from '../../config/serviceURLs.js'
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import buildQuery from 'odata-query'

const _gf = require('../../globalFunctions')

const mapStateToProps = (state, props) => {
  let { filterData: { statusFilter, typologyFilter, sectorFilter, regionFilter } } = state
  let { chartData: { chart1 } } = state
  let { projectData: { filteredProjectIDs } } = state
  return { statusFilter, typologyFilter, sectorFilter, regionFilter, chart1, filteredProjectIDs }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setScrollPos: payload => {
      dispatch({ type: "SET_PROJECT_SCROLL", payload })
    },
    setChartData: payload => {
      dispatch({ type: "SET_CHART_1", payload })
    }
  }
}

class DashGraph1Preview extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getChartData()
  }

  async getChartData() {

    if (this.props.chart1.length === 0) {

      const query = buildQuery({
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
      })

      try {
        let res = await fetch(apiBaseURL + `Projects${query}`)
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

    let minYear = Math.min(...data.filter(p => p.StartYear > 0).map(p => p.StartYear))
    let maxYear = Math.max(...data.filter(p => p.EndYear > 0).map(p => p.EndYear))
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

    let { chart1, filteredProjectIDs } = this.props

    let filteredData = chart1.filter(p => filteredProjectIDs.includes(p.ProjectId))
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
            this.props.setScrollPos(window.pageYOffset)
            location.hash = location.hash.replace("#/", "#/chart1")
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
            <ResponsiveContainer key={new Date().valueOf()} width="100%" height="100%">
              <LineChart data={transformedData} >
                <XAxis hide dataKey="Year" />
                <Line dot={false} type='monotone' dataKey='Adaptation' stroke='#8884d8' strokeWidth={2} />
                <Line dot={false} type="monotone" dataKey="Mitigation" stroke="#82ca9d" strokeWidth={2} />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          }
        </div>
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(DashGraph1Preview)