import React from 'react'
import { connect } from 'react-redux'
import { UILookup } from "../../config/ui_config.js"
import { Tooltip, TreeSelect } from 'antd';
import DualTip from './DualTip.jsx';

const _gf = require('../../globalFunctions')
const TreeSelectNode = TreeSelect.TreeNode;

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

class TreeSelectMultiple extends React.Component {

  constructor(props) {
    super(props);

    this.getDisabledState = this.getDisabledState.bind(this)
  }

  getLabelFontColour(uiconf) {
    if (typeof uiconf.required != 'undefined' && uiconf.required === true) {
      return "red"
    }
    else {
      return "black"
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
        id: item[Object.keys(item)[0]],
        text: item[Object.keys(item)[1]],
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

  renderTreeSelectNodes(data, level = "top") {

    let { allowEdit } = this.props

    if (allowEdit === true && level === "top" && !this.getDisabledState()) {

      //Insert "[Edit list values...]" entry
      if (data.filter(x => x.value === "[Edit list values...]").length === 0) {
        data.splice(0, 0, {
          "id": -1,
          "text": "[Edit list values...]",
          "modifiedState": false
        })
      }
    }

    return data.map((item) => {
      if (item.children) {
        return (
          <TreeSelectNode value={item.text} title={(item.modifiedState === true ? "* " : "") + item.text} key={item.id} dataRef={item}>
            {this.renderTreeSelectNodes(item.children, "child")}
          </TreeSelectNode>
        )
      }
      return <TreeSelectNode value={item.text} title={(item.modifiedState === true ? "* " : "") + item.text} key={item.id} />
    })
  }

  onSelect(value, label, extra) {

    if (!this.getDisabledState()) {

      let { callback } = this.props

      this.setState({ value });

      if (typeof callback !== 'undefined') {
        callback(value)
      }
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

    let { col, label, id, selectedValue, data } = this.props
    let uiconf = UILookup(id, label)
    let treeData = []
    let selVal = []

    if (data.length > 0) {

      //Get tree data
      treeData = this.transformDataTree(data)
    }

    return (
      <div className={col}>
        <DualTip label={uiconf.label} primaryTip={uiconf.tooltip} secondaryTip={uiconf.tooltip2} required={uiconf.required} />

        <TreeSelect
          showSearch
          searchPlaceholder="Search..."
          style={{ width: "100%" }}
          value={selectedValue}
          dropdownStyle={{ maxHeight: 250, overflow: 'auto' }}
          placeholder="Select..."
          allowClear
          onChange={this.onSelect.bind(this)}
          multiple
        >
          {this.renderTreeSelectNodes(treeData)}
        </TreeSelect>

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TreeSelectMultiple)