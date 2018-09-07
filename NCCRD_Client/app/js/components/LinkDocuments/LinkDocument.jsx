import React from 'react'
import { Row, Col, Input, Button, Fa, InputSwitch } from 'mdbreact'
import { connect } from 'react-redux'

//AntD Tree-Select
import Select from 'antd/lib/select'
import '../../../css/antd.select.css' //Overrides default antd.select css
const Option = Select.Option;

//AntD DatePicker
import DatePicker from 'antd/lib/date-picker'
import moment from 'moment';
import '../../../css/antd.date-picker.css'
import '../../../css/antd.time-picker.css'
import '../../../css/antd.input.css'

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateNav: payload => {
      dispatch({ type: "NAV", payload })
    }
  }
}

class LinkDocument extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      planType: "Adaptation",
      planDocLink: "",
      hasRiskAssesment: false,
      planLastUpdate: moment(new Date(), 'YYYY/MM/DD')
    }
  }

  componentDidMount() {
    this.props.updateNav(location.hash)
  }

  render() {

    let { planType, planDocLink, hasRiskAssesment, planLastUpdate } = this.state

    return (
      <>
        <hr style={{ marginTop: "2px" }} />
        <div style={{ marginLeft: "10px", marginTop: "30px" }}>
          <Row>
            <Col md="4">
              <label style={{ fontWeight: "bold" }}>1) Select your plan type</label>
              <Select
                style={{ width: "100%" }}
                onChange={(value) => { this.setState({ planType: value }) }}
                value={planType}
              >
                <Option value="Adaptation">
                  Adaptation
                </Option>
                <Option value="Mitigation">
                  Mitigation
                </Option>
              </Select>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md="8">
              <label style={{ fontWeight: "bold" }}>2) Add a link to your plan document</label>
              <Input size="sm"
                onChange={(e) => { this.setState({ planDocLink: e.target.value }) }}
                style={{
                  height: "24px",
                  marginTop: "-22px",
                  border: "1px solid lightgrey",
                  borderRadius: "5px",
                  padding: "5px"
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col md="8">
              <label style={{ fontWeight: "bold" }}>3) Does the adaptation plan have a risk and vulnerability assessment</label>
              <br />
              <div style={{ marginLeft: "-5px"}}>
                <Button
                  onClick={() => { this.setState({ hasRiskAssesment: true }) }}
                  color={hasRiskAssesment ? "default" : "grey"}
                  style={{ fontSize: hasRiskAssesment ? "13px" : "10px" }}
                  size="sm">
                  YES
              </Button>
                <Button
                  onClick={() => { this.setState({ hasRiskAssesment: false }) }}
                  color={!hasRiskAssesment ? "default" : "grey"}
                  style={{ fontSize: !hasRiskAssesment ? "13px" : "10px" }}
                  size="sm">
                  NO
              </Button>
              </div>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md="4">
              <label style={{ fontWeight: "bold" }}>4) When was the plan last updated?</label>
              <DatePicker
                defaultValue={planLastUpdate}
                style={{ width: "100%" }}
                onChange={(date, dateString) => { this.setState({ planLastUpdate: date }) }}
              />
            </Col>
          </Row>

          <br />

          <Button color="warning" style={{ marginLeft: "0px"}}>
            Submit
          </Button>

          <br />
          <br />

        </div>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkDocument)