import React from 'react'
import { Button, Input, FormInline } from 'mdbreact'
import { connect } from 'react-redux'
import { UILookup } from '../../../config/ui_config.js'
import { Tooltip } from 'antd';
import DualTip from '../../Shared/DualTip.jsx';

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
  }

  onChange(event) {

    //Update internal state
    this.props.loadTitleFilterInternal(event.target.value)
  }

  handleKeyDown(e) {
    if (e.keyCode == 13) {

      //Update global state
      let { loadTitleFilter, titleFilterInternal } = this.props
      loadTitleFilter(e.target.value)
    }
  }

  render() {

    let { titleFilterInternal } = this.props

    let uiconf = UILookup("txtTitleFilter", "Title")

    return (
      <div style={{ marginBottom: "-10px" }}>
        <DualTip label={uiconf.label} primaryTip={uiconf.tooltip} secondaryTip={uiconf.tooltip2} required={uiconf.required} />

        <Input size="sm"
          className="form-control"
          style={{
            padding: "5px",
            marginTop: "-23px",
            width: "98%",
            height: "21px",
            border: "1px solid lightgrey",
            borderRadius: "5px",
            backgroundColor: "white",
            marginBottom: "-10px"
          }}
          onChange={this.onChange.bind(this)} value={titleFilterInternal}
          hint="Search..."
          onKeyDown={this.handleKeyDown.bind(this)}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TitleFilter)