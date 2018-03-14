'use strict'

import React from 'react'
import { Button, Input } from 'mdbreact'

class TitleFilter extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-md-4">
                <label style={{fontWeight: "bold"}}>Title:</label>
                <div className="md-form form-sm">
                    <table>
                        <tbody>
                            <tr>
                                <td width="100%">
                                    <Input size="sm" style={{ marginTop: "-2px"}} />
                                </td>
                                <td>
                                    <Button color="primary" size="sm" style={{ height: "35px", marginLeft: "3px", marginTop: "-2px" }}>Apply</Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default TitleFilter