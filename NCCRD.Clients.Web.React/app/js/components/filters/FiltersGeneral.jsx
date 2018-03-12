'use strict'

import React from 'react'
import { Button } from 'mdbreact'
//import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

class FiltersGeneral extends React.Component {

    constructor(props) {
        super(props);

    }
    onComponentDidMount() {

    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <p style={{ fontSize: "large" }}>General filters:</p>
                    </div>
                </div>

                <div className="row">

                    <div className="col-md-4">
                        <label>Title:</label>
                        <div className="md-form form-sm">
                            <table>
                                <tbody>
                                    <tr>
                                        <td width="100%">
                                            <input type="text" style={{ marginTop: "-5px" }} />
                                        </td>
                                        <td>
                                            <Button color="primary" size="sm" style={{ margin: "3px 0px 0px 5px", height: "35px" }}>Apply</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="col-md-4" id="filterStatus">
                        <label>Status:</label>
                        <br />
                        <Select style={{ marginTop: "3px" }}
                            name="selFilterStatus"
                            value="0"
                            //onChange={this.handleChange}
                            options={[
                                { value: '0', label: 'Not started' },
                                { value: '1', label: 'Completed' },
                                { value: '2', label: 'In progress' },
                            ]}
                        />

                    </div>

                    <div className="col-md-4" id="filterTypology">
                        <label>Typology:</label>
                        <br />
                        <Select style={{ marginTop: "3px" }}
                            name="selFilterTypology"
                            value="0"
                            //onChange={this.handleChange}
                            options={[
                                { value: '0', label: 'Mitigation' },
                                { value: '1', label: 'Adaptation' },
                                { value: '2', label: 'Research' },
                            ]}
                        />
                    </div>

                </div>
            </div>
        )
    }
}

export default FiltersGeneral