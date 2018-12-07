import React, { Children } from 'react'
import { Row, Col, Button } from 'mdbreact'
import { connect } from 'react-redux'
import OData from 'react-odata'
import { apiBaseURL, vmsBaseURL } from '../../config/serviceURLs.cfg'
import { LineChart, Line, ResponsiveContainer, Tooltip, Legend, XAxis, YAxis } from 'recharts'
import buildQuery from 'odata-query'

//images
import popin from '../../../images/popin.png'

const _gf = require('../../globalFunctions')

const mapStateToProps = (state, props) => {
  let { filterData: { statusFilter, typologyFilter, sectorFilter, regionFilter } } = state
  let { chartData: { chart1 } } = state
  return { statusFilter, typologyFilter, sectorFilter, regionFilter, chart1 }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setChartData: payload => {
      dispatch({ type: "SET_CHART_1", payload })
    }
  }
}

class DashGraph1FullView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      filterIDs: []
    }
  }

  componentDidMount() {
    window.scroll({
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

  async getFilteredProjectIDs() {

    let { statusFilter, typologyFilter, regionFilter, sectorFilter } = this.props
    let filters = {}

    //ADD FILTERS//
    //Status//
    if (statusFilter !== 0) {
      filters.status = statusFilter
    }

    //Typology//
    if (typologyFilter !== 0) {
      filters.typology = typologyFilter
    }

    //Region//
    if (regionFilter != 0) {
      filters.region = regionFilter
    }

    //Sector//
    if (sectorFilter != 0) {
      filters.sector = sectorFilter
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
        let filterIDs = resBody.value.map(p => p.ProjectId)
        if (!_gf.arraysEqual(filterIDs, this.state.filterIDs)) {
          this.setState({ filterIDs })
        }
      }
      else {
        throw new Error(resBody.error.message)
      }

    }
    catch (ex) {
      console.error(ex)
    }

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

    let { chart1 } = this.props
    let { filterIDs } = this.state
    let filteredData = chart1.filter(p => filterIDs.includes(p.ProjectId))
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
          onClick={() => {
            location.hash = location.hash.replace("#/chart1", "")
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
            <ResponsiveContainer key={new Date().valueOf()} width="96%" height="98%">
              <LineChart data={transformedData} >
                <XAxis dataKey="Year" />
                <YAxis />
                <Line type='monotone' dataKey='Adaptation' stroke='#8884d8' strokeWidth={2} />
                <Line type="monotone" dataKey="Mitigation" stroke="#82ca9d" strokeWidth={2} />
                <Tooltip />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          }
        </div>
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(DashGraph1FullView)