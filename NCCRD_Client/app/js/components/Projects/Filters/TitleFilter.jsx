import React from 'react'
import { Button, Input, FormInline } from 'mdbreact'
import { connect } from 'react-redux'
import { UILookup } from '../../../config/ui_config.js'

const _gf = require("../../../globalFunctions")
const queryString = require('query-string')

const mapStateToProps = (state, props) => {
  let { filterData: { titleFilter, titleFilterInternal } } = state
  return { titleFilter, titleFilterInternal }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadTitleFilter: payload => {
      dispatch({ type: "LOAD_TITLE_FILTER", payload })
    },
    loadTitleFilterInternal: payload => {
      dispatch({ type: "LOAD_TITLE_FILTER_INTERNAL", payload })
    }
  }
}

class TitleFilter extends React.Component {

  constructor(props) {
    super(props);

    //Read initial filter from URL
    const parsedHash = queryString.parse(location.hash.replace("/projects?", ""))

    if (typeof parsedHash.title !== 'undefined') {

      //Update internal state
      //this.onClick(parsedHash.title)
      _gf.stripURLParam("title=" + parsedHash.title)
    }
  }

  onChange(event) {

    //Update internal state
    this.props.loadTitleFilterInternal(event.target.value)
  }

  // onClick(filterValue, e) {

  //   //Update global state
  //   let { loadTitleFilter, titleFilterInternal } = this.props

  //   loadTitleFilter(filterValue)
  // }

  test(e) {
    if (e.keyCode == 13) {

      //Update global state
      let { loadTitleFilter, titleFilterInternal } = this.props
      loadTitleFilter(e.target.value)
    }
  }

  render() {

    let { titleFilterInternal } = this.props

    let uiconf = UILookup("txtTitleFilter", "Title:")

    return (
      <div className="col-md-4" style={{ paddingRight: "55px"}}>
        <label data-tip={uiconf.tooltip} style={{ fontWeight: "bold" }}>{uiconf.label}</label>
        <Input size="sm"
          className="form-control"
          style={{ padding: "5px", marginTop: "-24px", width: "100%", height: "24px", border: "1px solid lightgrey", borderRadius: "5px" }}
          onChange={this.onChange.bind(this)} value={titleFilterInternal} icon="search" hint="Search..."
          onKeyDown={this.test.bind(this)}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TitleFilter)