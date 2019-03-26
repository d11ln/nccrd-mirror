import React from 'react'
import { connect } from 'react-redux'
import popout from '../../../images/popout.png'
import { apiBaseURL, vmsBaseURL } from '../../config/serviceURLs.js'
import { XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import buildQuery from 'odata-query'

const _gf = require('../../globalFunctions')

const mapStateToProps = (state, props) => {
  let { filterData: { statusFilter, typologyFilter, regionFilter } } = state
  let { chartData: { chart4 } } = state
  let { projectData: { filteredProjectIDs } } = state
  let { lookupData: { sector } } = state
  return { statusFilter, typologyFilter, regionFilter, chart4, filteredProjectIDs, sector }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setScrollPos: payload => {
      dispatch({ type: "SET_PROJECT_SCROLL", payload })
    },
    setChartData: payload => {
      dispatch({ type: "SET_CHART_4", payload })
    },
    loadSectors: payload => {
      dispatch({ type: "LOAD_SECTOR", payload })
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

class DashGraph4Preview extends React.Component {

  constructor(props) {
    super(props);

    this.renderTooltipContent = this.renderTooltipContent.bind(this)
    this.getPercent = this.getPercent.bind(this)
    this.toPercent = this.toPercent.bind(this)
  }

  componentDidMount() {
    this.getChartData()
    this.getSectors()
  }

  async getChartData() {

    if (this.props.chart4.length === 0) {

      const query = buildQuery({
        select: ["ProjectId", "StartYear", "EndYear"],
        expand: {
          AdaptationDetails: {
            select: ["AdaptationDetailId", "SectorId"],
            filter: {
              SectorId: { ne: null }
            },
          },
          MitigationDetails: {
            select: ["MitigationDetailId", "SectorId"],
            filter: {
              SectorId: { ne: null }
            },
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

  async getSectors() {

    let { sector, loadSectors } = this.props

    if (sector.length === 0) {
      //Get Sectors list/details
      try {

        let res = await fetch(vmsBaseURL + "sectors/flat")

        //Get response body
        let resBody = await res.json()

        if (res.ok && resBody && resBody.items) {
          loadSectors(resBody.items)
        }
        else {
          throw new Error(resBody.error.message)
        }

      } catch (ex) {
        console.error(ex)
      }
    }
  }

  transformData(data, sectors) {

    let tData = []

    let minYear = Math.min(...data.filter(p => p.StartYear > 0).map(p => p.StartYear))
    let maxYear = Math.max(...data.filter(p => p.EndYear > 0).map(p => p.EndYear))
    let currentYear = new Date().getFullYear()

    if (maxYear > currentYear) {
      maxYear = currentYear
    }

    //Get unique hazard IDs
    let uniqueSectorIDs2 = []
    data.forEach(h => {

      //Adaptation
      h.AdaptationDetails.forEach(a => {
        if (uniqueSectorIDs2.filter(x => x.SectorId === a.SectorId).length === 0) {
          uniqueSectorIDs2.push({
            SectorId: a.SectorId,
            Count: [...data.map(d => d.AdaptationDetails.filter(x => x.SectorId === a.SectorId).length),
            ...data.map(d => d.MitigationDetails.filter(x => x.SectorId === a.SectorId).length)]
              .reduce((a, b) => { return a + b }, 0)
          })
        }
      })

      //Mitigation
      h.MitigationDetails.forEach(m => {
        if (uniqueSectorIDs2.filter(x => x.SectorId === m.SectorId).length === 0) {
          uniqueSectorIDs2.push({
            SectorId: m.SectorId,
            Count: [...data.map(d => d.AdaptationDetails.filter(x => x.SectorId === m.SectorId).length),
            ...data.map(d => d.MitigationDetails.filter(x => x.SectorId === m.SectorId).length)]
              .reduce((a, b) => { return a + b }, 0)
          })
        }
      })
    })

    //Sort by Count
    uniqueSectorIDs2.sort(function (sec1, sec2) {
      return sec2.Count - sec1.Count
    });

    //Take top 5 only
    uniqueSectorIDs2 = uniqueSectorIDs2.slice(0, 5)

    for (let i = minYear; i <= maxYear; i++) {

      let tItem = { Year: i }

      uniqueSectorIDs2.forEach(sec => {

        //Get Sector Name
        let secName = "Unknown"
        let searchSec = sectors.length > 0 ? sectors.filter(x => x.Id == sec.SectorId) : []
        if (searchSec.length > 0) {
          secName = searchSec[0].Text.trim()
        }

        //Get relevant Sectors
        tItem[secName] = [
          ...data
            .filter(d => d.StartYear <= i && d.EndYear >= i)
            .map(d => d.AdaptationDetails.filter(x => x.SectorId === sec.SectorId).length),
          ...data
            .filter(d => d.StartYear <= i && d.EndYear >= i)
            .map(d => d.MitigationDetails.filter(x => x.SectorId === sec.SectorId).length)
        ].reduce((a, b) => { return a + b }, 0)

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

  renderAreas(transformedData, sectors) {

    let areas = []
    let index = 0;

    Object.keys(transformedData[0]).filter(k => k !== "Year")
      .forEach(key => {

        //Get Sector color
        let color = "lightgrey"
        let searchSec = sectors.length > 0 ? sectors.filter(h => h.Text.trim() === key): []
        if (searchSec.length > 0) {
          color = chartColours[index]
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

    let { chart4, filteredProjectIDs, sector } = this.props

    //Remove projects with no sectors
    let tData = []
    chart4.forEach(d => {
      if (d.AdaptationDetails.length > 0 || d.MitigationDetails.length > 0) {
        tData.push(d)
      }
    })
    chart4 = tData

    let filteredData = chart4.filter(p => filteredProjectIDs.includes(p.ProjectId))
    let transformedData = this.transformData(filteredData, sector)

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
            location.hash = location.hash.replace("#/", "#/chart4")
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
          SECTORS
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
            (transformedData.length > 0 && sector.length > 0) &&
            <ResponsiveContainer key={"G4Graph"} width="100%" height="100%">
              <BarChart data={transformedData} /*stackOffset="expand"*/ >
                <XAxis hide dataKey="Year" />
                <YAxis hide tickFormatter={this.toPercent} />
                <Tooltip content={this.renderTooltipContent} />
                {this.renderAreas(transformedData, sector)}
              </BarChart>
            </ResponsiveContainer>
          }
        </div>
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(DashGraph4Preview)