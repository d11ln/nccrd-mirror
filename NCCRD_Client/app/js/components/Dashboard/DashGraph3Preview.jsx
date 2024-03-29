import React, { Children } from 'react'
import { Row, Col, Button } from 'mdbreact'
import { connect } from 'react-redux'
import popout from '../../../images/popout.png'
import OData from 'react-odata'
import { apiBaseURL, vmsBaseURL } from '../../config/serviceURLs.js'
import { XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import buildQuery from 'odata-query'
import { CustomFetch } from '../../globalFunctions';

const _gf = require('../../globalFunctions')

const mapStateToProps = (state, props) => {
  let { filterData: { statusFilter, sectorFilter, regionFilter, typologyFilter } } = state
  let { chartData: { chart3 } } = state
  let { projectData: { filteredProjectIDs } } = state
  let { lookupData: { hazards } } = state
  return { statusFilter, sectorFilter, regionFilter, typologyFilter, chart3, filteredProjectIDs, hazards }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setScrollPos: payload => {
      dispatch({ type: "SET_PROJECT_SCROLL", payload })
    },
    setChartData: payload => {
      dispatch({ type: "SET_CHART_3", payload })
    },
    loadHazards: payload => {
      dispatch({ type: "LOAD_HAZARDS", payload })
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

    this.renderTooltipContent = this.renderTooltipContent.bind(this)
    this.getPercent = this.getPercent.bind(this)
    this.toPercent = this.toPercent.bind(this)
  }

  componentDidMount() {
    this.getChartData()
    this.getHazards()
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
        let res = await CustomFetch(apiBaseURL + `AdaptationDetails${query}`)
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

    let { hazards, loadHazards } = this.props

    if (hazards.length === 0) {

      //Get Hazards list/details
      try {

        let res = await CustomFetch(vmsBaseURL + "hazards/flat")

        //Get response body
        let resBody = await res.json()

        if (res.ok && resBody && resBody.items) {
          loadHazards(resBody.items)
        }
        else {
          throw new Error(resBody.error.message)
        }

      } catch (ex) {
        console.error(ex)
      }
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
        let searchHaz = hazards.filter(x => x.Id == haz.HazardId)
        if (searchHaz.length > 0) {
          hazName = searchHaz[0].Text.trim()
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
        let searchHaz = hazards.length > 0 ? hazards.filter(h => h.Text.trim() === key) : []
        if (searchHaz.length > 0) {
          color = chartColours[index] //searchHaz[0].color
        }

        areas.push(
          <Bar
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

    let { chart3, filteredProjectIDs, hazards } = this.props
    let filteredData = chart3.filter(p => filteredProjectIDs.includes(p.Project.ProjectId))
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
            this.props.setScrollPos(document.getElementById("app-content").scrollTop)
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
              <BarChart data={transformedData} >
                <XAxis hide dataKey="Year" />
                <YAxis hide tickFormatter={this.toPercent} />
                <Tooltip content={this.renderTooltipContent} />
                {this.renderAreas(transformedData, hazards)}
              </BarChart>
            </ResponsiveContainer>
          }
        </div>
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(DashGraph3Preview)