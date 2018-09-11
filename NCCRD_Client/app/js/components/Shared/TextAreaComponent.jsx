import React from 'react'
import TextareaAutosize from "react-textarea-autosize"
import { connect } from 'react-redux'
import { UILookup } from "../../config/ui_config.js"
import { Input } from "mdbreact"

const _gf = require('../../globalFunctions')

const mapStateToProps = (state, props) => {
    let { globalData: { editMode } } = state
    return { editMode }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setValue: (key, payload) => {
            dispatch({ type: key, payload })
        }
    }
}

class TextAreaComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    fixNullOrUndefinedValue(value) {

        if (typeof value === 'undefined' || value === null) {
            value = ""
        }

        return value
    }

    valueChange(event) {

        let { setValue, setValueKey, parentId, editMode } = this.props

        if (typeof setValueKey !== 'undefined') {
            setValue(setValueKey, { value: event.target.value, id: parentId, state: editMode === true ? "modified" : "original" })
        }
    }

    getLabelFontColour(uiconf) {
        if (typeof uiconf.required != 'undefined' && uiconf.required === true) {
            return "red"
        }
        else {
            return "black"
        }
    }

    render() {

        let { col, label, editMode, id, value } = this.props
        value = this.fixNullOrUndefinedValue(value)

        let uiconf = UILookup(id, label)

        return (
            <div className={col}>
                <label data-tip={uiconf.tooltip} style={{ fontWeight: "bold", color: this.getLabelFontColour(uiconf) }}>{uiconf.label}</label>
                <TextareaAutosize
                    readOnly={!editMode}
                    style={{
                        border: "1px solid lightgrey",
                        borderRadius: "5px",
                        padding: "5px",
                        color: _gf.getFontColour(editMode),
                        width: "100%"
                    }}
                    value={value}
                    onChange={this.valueChange.bind(this)}
                />
            </div>
        )

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextAreaComponent)