import React from 'react'
import { Button, Fa } from 'mdbreact'
import { connect } from 'react-redux'
import { DEAGreen, DEAGreenDark } from '../../../config/colours.js'

class EditButtonsGroup extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {

    let { editMode, allowAdd, editClick, discardClick, saveClick, addClick, user, readOnly } = this.props

    return (
      <>
        {
          ((user && !user.expired) && !readOnly) &&
          <div style={{ display: "inline-block", float: "right" }}>

            {
              !editMode &&
              <Button
                style={{ margin: "0px 0px 20px 15px", width: 150 }}
                color="warning"
                size="sm"
                onClick={editClick}
              >
                <Fa style={{ marginRight: 15 }} icon="pencil" />
                Edit
              </Button>
            }

            {
              (allowAdd && editMode) &&
              <Button
                style={{ margin: "0px 0px 20px 15px", width: 150, marginRight: 15 }}
                color="primary"
                size="sm"
                onClick={addClick}
              >
                <Fa style={{ marginRight: 15 }} icon="plus" />
                Add
              </Button>
            }

            {
              editMode &&
              <Button
                style={{ margin: "0px 0px 20px 15px" }}
                size="sm"
                color="warning"
                onClick={saveClick}
                style={{ backgroundColor: "grey", margin: "0px 0px 20px 15px", width: 150 }}
              >
                <Fa style={{ marginRight: 15 }} icon="save" />
                Save
              </Button>
            }

            {
              editMode &&
              <Button
                size="sm"
                color=""
                onClick={discardClick}
                style={{ backgroundColor: "grey", margin: "0px 0px 20px 15px", width: 150 }}
              >
                <Fa style={{ marginRight: 15 }} icon="trash" />
                Discard
              </Button>
            }

            {
              editMode &&
              <div style={{ textAlign: "right", marginRight: 2, color: "red", fontSize: 15, fontWeight: 500, marginTop: -2 }}>
                <label><i>Be careful, you are editing!</i></label>
              </div>
            }
          </div>
        }
      </>
    )
  }
}

export default EditButtonsGroup