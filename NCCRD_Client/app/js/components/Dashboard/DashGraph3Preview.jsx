import React, { Children } from 'react'
import { Row, Col, Button } from 'mdbreact'
import { connect } from 'react-redux'
import popout from '../../../images/popout.png'
import OData from 'react-odata'
import { apiBaseURL, vmsBaseURL } from '../../config/serviceURLs.js'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import buildQuery from 'odata-query'

const _gf = require('../../globalFunctions')

const mapStateToProps = (state, props) => {
  let { filterData: { statusFilter, sectorFilter, regionFilter, typologyFilter } } = state
  let { chartData: { chart3 } } = state
  return { statusFilter, sectorFilter, regionFilter, typologyFilter, chart3 }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setScrollPos: payload => {
      dispatch({ type: "SET_PROJECT_SCROLL", payload })
    },
    setChartData: payload => {
      dispatch({ type: "SET_CHART_3", payload })
    }
  }
}

const chartColours = [
  "#82CA9D", //pastel green
  "#8884D8", //pastel purple/blue
  "#FFCF77", //pastel orange
  "#A2D0D8", //pastel blue-grey
  "#FF6868" //pastel red
]

class DashGraph3Preview extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      hazards: [],
      filterIDs: []
    }

    this.renderTooltipContent = this.renderTooltipContent.bind(this)
    this.getPercent = this.getPercent.bind(this)
    this.toPercent = this.toPercent.bind(this)
  }

  componentDidMount() {
    this.getChartData()
    this.getHazards()
    this.getFilteredProjectIDs()
  }

  componentDidUpdate() {
    this.getFilteredProjectIDs()
  }

  async getChartData() {

    if (this.props.chart3.length === 0) {

      const query = buildQuery({
        select: ["AdaptationDetailId", "HazardId"],
        filter: {
          HazardId: { ne: null }
        },
        expand: {
          Project: {
            select: ["ProjectId", "StartYear", "EndYear"]
          }
        }
      })

      try {
        let res = await fetch(apiBaseURL + `AdaptationDetails${query}`)
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

  async getHazards() {

    //Get Hazards list/details
    try {

      let res = await fetch(vmsBaseURL + "hazards/flat")

      //Get response body
      let resBody = await res.json()

      if (res.ok) {
        this.setState({ hazards: resBody.items })
      }
      else {
        throw new Error(resBody.error.message)
      }

    } catch (ex) {
      console.error(ex)
    }
  }

  async getFilteredProjectIDs() {

    let { statusFilter, regionFilter, sectorFilter, typologyFilter } = this.props
    let filters = {}

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

  transformData(data, hazards) {

    let tData = []

    let minYear = Math.min(...data.filter(p => p.Project.StartYear > 0).map(p => p.Project.StartYear))
    let maxYear = Math.max(...data.filter(p => p.Project.EndYear > 0).map(p => p.Project.EndYear))
    let currentYear = new Date().getFullYear()

    if (maxYear > currentYear) {
      maxYear = currentYear
    }

    //Get unique hazard IDs
    let uniqueHazardIDs2 = []
    data.forEach(h => {
      if (uniqueHazardIDs2.filter(x => x.HazardId === h.HazardId).length === 0) {
        uniqueHazardIDs2.push({
          HazardId: h.HazardId,
          Count: data.filter(d => d.HazardId === h.HazardId).length
        })
      }
    })

    //Sort by Count
    uniqueHazardIDs2.sort(function (haz1, haz2) {
      return haz2.Count - haz1.Count;
    });

    //Take top 5 only
    uniqueHazardIDs2 = uniqueHazardIDs2.slice(0, 5)

    for (let i = minYear; i <= maxYear; i++) {

      let tItem = { Year: i }

      uniqueHazardIDs2.forEach(haz => {

        //Get Hazard Name
        let hazName = "Unknown"
        let searchHaz = hazards.filter(x => x.id == haz.HazardId)
        if (searchHaz.length > 0) {
          hazName = searchHaz[0].value.trim()
        }

        //Get relevant hazards
        let filteredHazards = data.filter(d => d.Project.StartYear <= i && d.Project.EndYear >= i && d.HazardId == haz.HazardId)
        tItem[hazName] = filteredHazards.length

      })

      tData.push(tItem)
    }

    return tData
  }

  getPercent(value, total) {
    const ratio = total > 0 ? value / total : 0;
    return this.toPercent(ratio, 1);
  }

  toPercent(decimal, fixed = 0) {
    return `${(decimal * 100).toFixed(fixed)}%`
  }

  renderTooltipContent(params) {
    const { payload, label, active } = params;
    const total = payload.reduce((result, entry) => (result + entry.value), 0);

    return (
      <div>
        {
          active &&
          <div style={{ backgroundColor: "white", padding: "10px", border: "1px solid gainsboro" }}>
            <p className="total" style={{ marginBottom: "5px" }}>{`${label} (Total: ${total})`}</p>
            {
              payload.map((entry, index) => (
                <p key={`item-${index}`} style={{ color: entry.color, marginBottom: "0px", fontSize: "14px" }}>
                  {`${entry.name}: ${entry.value} (${this.getPercent(entry.value, total)})`}
                </p>
              ))
            }
          </div>
        }
      </div>
    )
  }

  renderAreas(transformedData, hazards) {

    let areas = []
    let index = 0;

    Object.keys(transformedData[0]).filter(k => k !== "Year")
      .forEach(key => {

        //Get Hazard color
        let color = "lightgrey"
        let searchHaz = hazards.filter(h => h.value.trim() === key)
        if (searchHaz.length > 0) {
          color = chartColours[index] //searchHaz[0].color
        }

        areas.push(
          <Area
            key={key}
            type='monotone'
            dataKey={key}
            stackId="1"
            stroke={color}
            fill={color}
          />
        )

        index += 1
      })

    return areas
  }

  render() {

    let { hazards, filterIDs } = this.state
    let { chart3 } = this.props
    let filteredData = chart3.filter(p => filterIDs.includes(p.Project.ProjectId))
    let transformedData = this.transformData(filteredData, hazards)

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
            location.hash = location.hash.replace("#/", "#/chart3")
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
          HAZARDS
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
            (transformedData.length > 0 && hazards.length > 0) &&
            <ResponsiveContainer key="G3Graph" width="100%" height="100%">
              <AreaChart data={transformedData} stackOffset="expand" >
                <XAxis hide dataKey="Year" />
                <YAxis hide tickFormatter={this.toPercent} />
                <Tooltip content={this.renderTooltipContent} />
                {this.renderAreas(transformedData, hazards)}
              </AreaChart>
            </ResponsiveContainer>
          }
        </div>
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(DashGraph3Preview)