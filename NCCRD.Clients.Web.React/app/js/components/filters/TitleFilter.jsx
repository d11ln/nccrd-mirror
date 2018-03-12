'use strict'

import React from 'react'
import { Button } from 'mdbreact'

class TitleFilter extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
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
        )
    }
}

export default TitleFilter