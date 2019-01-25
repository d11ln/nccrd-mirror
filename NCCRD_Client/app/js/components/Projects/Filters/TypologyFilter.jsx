import React from 'react'
import { Button } from 'mdbreact'
import { connect } from 'react-redux'
import { apiBaseURL } from "../../../config/serviceURLs.js"
import SelectComponent from '../../Shared/SelectComponent.jsx'

const _gf = require("../../../globalFunctions")
const queryString = require('query-string')
const o = require("odata")

const mapStateToProps = (state, props) => {
  let { lookupData: { typology } } = state
  let { filterData: { typologyFilter } } = state
  return { typology, typologyFilter }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadData: payload => {
      dispatch({ type: "LOAD_TYPOLOGY", payload })
    },
    loadTypologyFilter: payload => {
      dispatch({ type: "LOAD_TYPOLOGY_FILTER", payload })
    }
  }
}

class TypologyFilter extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

    //Load data
    let { loadData } = this.props

    //Get data
    var oHandler = o(apiBaseURL + "Typology")
      .select("TypologyId,Value")
      .orderBy("Value")

    oHandler.get(function (data) {
      loadData(data)
    }, function (error) {
      console.error(error)
    })
  }

  render() {

    let { typologyFilter } = this.props

    return (
      <SelectComponent
        id="selTypologyFilter"
        col="col-md-2"
        label="Typology:"
        selectedValue={typologyFilter}
        data={this.props.typology}
        selectCallback={this.selectCallbackHandler}
        setSelectedValueKey={"LOAD_TYPOLOGY_FILTER"}
        editModeOverride={true}
        allowEdit={false}
        labelStyle={{
          fontSize: "14px",
          color: "grey",
          fontWeight: "400"
        }}
        style={{
          marginTop: "-4px",
          marginRight: "0px",
          marginBottom: "15px"
        }}
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TypologyFilter)