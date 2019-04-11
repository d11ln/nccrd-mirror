import React from 'react'
import { connect } from 'react-redux'
import { UILookup } from "../../config/ui_config.js"
import { Cascader } from 'antd'
import DualTip from './DualTip.jsx';

const mapStateToProps = (state, props) => {
  let { globalData: { editMode } } = state
  let editListModalStateChanged = state.editListModalData.show
  return { editMode, editListModalStateChanged }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedValue: (key, payload) => {
      dispatch({ type: key, payload })
      dispatch({ type: "SET_PROJECT_DETAILS_VERIFIED", payload: { value: false, state: 'modified' } })
    },
    setEditList: (payload) => {
      dispatch({ type: "SET_EDIT_LIST", payload })
    }
  }
}

class CascaderSelectComponent extends React.Component {

  constructor(props) {
    super(props);

    this.getDisabledState = this.getDisabledState.bind(this)
    this.dependencyTreeSelect = this.dependencyTreeSelect.bind(this)
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

  transformDataTree(effectiveData, globalData, level = 0) {

    let treeNodes = []
    let parentIdKey = "Parent" + Object.keys(effectiveData[0])[0].toString()

    if (typeof globalData === 'undefined') {
      globalData = effectiveData
    }

    if (level === 0) {
      effectiveData = effectiveData.filter(x => x[parentIdKey] === null)
    }

    effectiveData.map(item => {

      let newTreeNode = {
        key: item[Object.keys(item)[0]],
        id: item[Object.keys(item)[0]],
        value: item[Object.keys(item)[1]],
        label: item[Object.keys(item)[1]],
        modifiedState: item.modifiedState
      }

      let children = globalData.filter(x => x[parentIdKey] == newTreeNode.id)
      if (children.length > 0) {
        newTreeNode.children = this.transformDataTree(children, globalData, (level + 1))
      }

      treeNodes.push(newTreeNode)
    })

    return treeNodes
  }

  dependencyTreeSelect(labels, selectedOptions) {

    if (!this.getDisabledState()) {

      let { setSelectedValueKey, setSelectedValue, editMode, parentId, setEditList, data, dispatch, persist, type, dependencies, newItemTemplate } = this.props
      let selectedValue = 0

      if (labels.length > 0) {
        selectedValue = parseInt(selectedOptions[selectedOptions.length - 1].id)
      }

      if (selectedValue == -1) {

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
    }
  }

  getSelectedValue(data, id) {

    let labels = []

    //Get selected value
    let idKey = Object.keys(data[0])[0].toString()
    let valueKey = Object.keys(data[0])[1].toString()
    let valObj = data.filter(x => x[idKey] == id)[0]

    if (typeof valObj !== 'undefined') {
      labels.unshift(valObj[valueKey])

      if (typeof valObj["Parent" + idKey] !== 'undefined' && valObj["Parent" + idKey] !== null) {
        labels.unshift(...this.getSelectedValue(data, parseInt(valObj["Parent" + idKey])))
      }
    }

    return labels
  }

  filter(inputValue, path) {
    let test = path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1)
    console.log("test", test)
    return ({ test });
  }

  render() {

    let { col, label, id, selectedValue, data, style, labelStyle, matchWidth, placeholder, disabled } = this.props
    let uiconf = UILookup(id, label)
    let treeData = []
    let selVal = []

    if (!style) {
      style = {}
    }

    if (!labelStyle) {
      labelStyle = {}
    }

    if (!matchWidth) {
      matchWidth = false
    }

    if (!placeholder) {
      placeholder = "Select..."
    }

    if (data.length > 0) {
      //Get tree data
      treeData = this.transformDataTree(data)
      //Get selected value
      selVal = this.getSelectedValue(data, selectedValue)
    }

    //Search toggle function
    let filter = (inputValue, path) => {
      return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1))
    }

    //Display render function
    let displayRender = (labels) => {
      return labels[labels.length - 1]
    }

    //Display render function for search results
    const displayRenderSearch = (inputValue, path) => path.map((item, i) => {
      if (i === path.length - 1) {
        return (
          <span key={item.value} style={{ fontWeight: 'bold' }}>
            {item.label}
          </span>
        )
      }
      return <span key={item.value}>{item.label} / </span>
    });

    return (
      <div className={col}>
        <DualTip label={uiconf.label} primaryTip={uiconf.tooltip} secondaryTip={uiconf.tooltip2} required={uiconf.required} />

        <Cascader
          options={treeData}
          expandTrigger="hover"
          placeholder={placeholder}
          disabled={disabled}
          value={selVal}
          displayRender={displayRender}
          showSearch={{ filter, limit: false, matchInputWidth: false, render: displayRenderSearch }}
          onChange={this.dependencyTreeSelect}
          changeOnSelect
          style={{ marginTop: -5, width: "100%", ...style }}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CascaderSelectComponent)