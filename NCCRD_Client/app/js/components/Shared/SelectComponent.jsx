import React from 'react'
import { connect } from 'react-redux'
import { UILookup } from "../../config/ui_config.js"
import { Select } from 'antd'

const _gf = require('../../globalFunctions')

//AntD Tree-Select
// import Select from 'antd/lib/select'
//import '../../../css/antd.select.css' //Overrides default antd.select css
const Option = Select.Option;

const mapStateToProps = (state, props) => {
  let { globalData: { editMode } } = state
  let editListModalStateChanged = state.editListModalData.show
  return { editMode, editListModalStateChanged }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedValue: (key, payload) => {
      dispatch({ type: key, payload })
    },
    setEditList: (payload) => {
      dispatch({ type: "SET_EDIT_LIST", payload })
    }
  }
}

let allowChange = false

class SelectComponent extends React.Component {

  constructor(props) {
    super(props);

    this.onSelect = this.onSelect.bind(this)
    this.getDisabledState = this.getDisabledState.bind(this)
    this.onClick = this.onClick.bind(this);
    this.otherDropdownsClose = this.otherDropdownsClose.bind(this);
  }

  onClick(e) {

    if (this.getDisabledState()) {
      return;
    }

    // check if select is multiple
    if (e.target.dataset.multiple === 'true') {
      return;
    }

    if (e.target.classList.contains('select-dropdown')) {
      this.otherDropdownsClose();
      e.target.nextElementSibling.classList.add('fadeIn');
    } else {
      this.otherDropdownsClose();
    }
  }

  otherDropdownsClose() {
    let dropdowns = document.querySelectorAll('.dropdown-content');
    for (let i = 0; i < dropdowns.length; i++) {
      if (dropdowns[i].classList.contains('fadeIn')) {
        dropdowns[i].classList.remove('fadeIn');
      }
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.onClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClick);
  }

  preProcessData(data) {

    let preProcessedItems = []

    //Pre-process items
    data.map(item => {

      let parentKeys = Object.keys(item).filter(key => key.startsWith("Parent") && key.endsWith("Id"))

      //Push item
      preProcessedItems.push({
        id: item[Object.keys(item)[0]],
        value: Object.keys(item).includes("Value") ? item.Value : item[Object.keys(item)[1]],
        parentId: parentKeys.length > 0 ? item[parentKeys[0]] : null,
        refId: item.RefId
      })
    })

    return preProcessedItems
  }

  selectOptions() {

    const { data, dataFilterKey, dataFilterValue, allowEdit, label, selectedValue } = this.props

    let ar = []
    let filteredData = data

    if (typeof filteredData !== 'undefined') {

      //Filter data (optional)
      if (typeof dataFilterKey !== 'undefined' && typeof dataFilterValue !== 'undefined') {
        filteredData = data.filter(x => x[dataFilterKey] == dataFilterValue)
      }

      //Transform data
      let procData = this.preProcessData(filteredData)

      //Implement state flow control
      if (selectedValue > 0) {
        let dataItem = data.filter(x => x[Object.keys(x)[0]] === selectedValue)[0]
        if (dataItem.NextStates) {
          let nextStates = dataItem.NextStates.split(",").map(x => parseInt(x))

          if (nextStates && nextStates.length > 0) {
            procData = procData.filter(x => nextStates.includes(x.refId))
          }
        }
      }

      //Allow editing
      if (allowEdit === true && !this.getDisabledState()) {

        //Insert "[Edit list values...]" entry
        if (procData.filter(x => x.value === "[Edit list values...]").length === 0) {
          procData.splice(0, 0, {
            "id": -1,
            "value": "[Edit list values...]",
          })
        }
      }

      //Add options
      for (let i of procData) {
        ar.push(
          <Option key={i.id} value={i.value}>
            {i.value}
          </Option>
        )
      }
    }

    return ar
  }

  getLabelFontColour(uiconf) {
    if (typeof uiconf.required != 'undefined' && uiconf.required === true) {
      return "red"
    }
    else {
      return "black"
    }
  }

  onSelect(value) {

    if (!this.getDisabledState()) {

      let { setSelectedValueKey, setSelectedValue, editMode, parentId, setEditList, data, dispatch, persist, type, dependencies, newItemTemplate } = this.props
      let selectedValue = 0

      if (value !== null) {
        if (value === '[Edit list values...]') {
          selectedValue = -1
        }
        else {

          let dataItem = data.filter(x => x.Value === value)[0]

          if (typeof dataItem !== 'undefined' && dataItem !== null) {
            selectedValue = parseInt(dataItem[Object.keys(dataItem)[0]])
          }
        }
      }

      if (selectedValue === -1) {
        //Setup and Show EditListModal
        if (typeof type === 'undefined') {
          type = "std"
        }
        if (typeof dependencies === 'undefined') {
          dependencies = []
        }

        setEditList({
          show: true, data: data, dispatch: dispatch, persist: persist, type: type,
          dependencies: dependencies, newItemTemplate: newItemTemplate
        })
      }
      else {
        //Dispatch to store
        if (typeof setSelectedValueKey !== 'undefined') {
          setSelectedValue(setSelectedValueKey, { value: selectedValue, id: parentId, state: editMode === true ? "modified" : "original" })
        }
      }

      allowChange = false
    }
  }

  getDisabledState() {
    let { editMode, editModeOverride } = this.props

    let disabledState = true

    if (typeof editModeOverride !== "undefined" && editModeOverride === true) {
      disabledState = false
    }
    else if (typeof editMode !== "undefined" && editMode === true) {
      disabledState = false
    }

    return disabledState
  }

  render() {

    let { col, label, id, selectedValue, data, style, labelStyle, allowClear, matchWidth } = this.props
    let uiconf = UILookup(id, label)
    let displayValue = "Select..."

    if (selectedValue > 0) {
      let dataItem = data.filter(x => x[Object.keys(x)[0]] === selectedValue)[0]
      if (typeof dataItem !== 'undefined' && dataItem !== null && typeof dataItem.Value !== 'undefined') {
        displayValue = dataItem.Value
      }
    }

    if (!style) {
      style = {}
    }

    if (!labelStyle) {
      labelStyle = {}
    }

    if (!allowClear) {
      allowClear = false
    }

    if (!matchWidth) {
      matchWidth = false
    }

    return (
      <div className={col}>
        <label
          data-tip={uiconf.tooltip}
          style={{
            fontWeight: "bold",
            color: this.getLabelFontColour(uiconf),
            ...labelStyle
          }} >
          {uiconf.label}
        </label>

        <Select
          style={{ width: "100%", ...style }}
          dropdownMatchSelectWidth={matchWidth}
          dropdownStyle={{ width: 200 }}
          onChange={this.onSelect}
          value={displayValue}
          // disabled={this.getDisabledState()}
          allowClear={allowClear}
        >
          {this.selectOptions()}
        </Select>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectComponent)