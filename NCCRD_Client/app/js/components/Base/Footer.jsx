import React from 'react'
import { Col, Row, Container, Footer as MDBFooter, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';

import { footerConfig } from '../../../data/footerConfig.cfg'

//Images
import nrf_seaon from '../../../images/nrf_saeon.png'

class Footer extends React.Component {

  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this)
    this.renderLinks = this.renderLinks.bind(this)
    this.handleResize = this.handleResize.bind(this)

    this.state = {
      showModal: false,
      modalHeader: "",
      modalSrc: "",
      isNarrowDisplay: false
    }
  }

  componentDidMount(){
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize)
  }

  handleResize(){
    this.setState({
      isNarrowDisplay: (window.innerWidth < 900)
    })
  }

  toggleModal(state, header = "", src = "") {
    this.setState({
      showModal: state,
      modalHeader: header,
      modalSrc: src
    })
  }

  renderLinks() {

    let footerLinks = []

    if (footerConfig && footerConfig.length > 0) {
      footerConfig.forEach(x => {
        footerLinks.push(
          <div
            key={x.text}
            style={{
              marginLeft: "10px",
              marginRight: "10px",
              color: "#4285F4",
              cursor: "pointer",
              display: "inline-block"
            }}
            onClick={() => this.toggleModal(true, x.text, x.link)}
          >
            <u>{x.text}</u>
          </div>
        )
      })
    }

    return footerLinks
  }

  render() {

    let { showModal, modalHeader, modalSrc, isNarrowDisplay } = this.state

    return (
      <div style={{ padding: "5px 15px 5px 15px", borderTop: "1px solid #E8E8E8" }}>
        <MDBFooter color="light" style={{ color: "black" }}>
          <Row className="align-items-center" style={{ marginBottom: "15px", marginTop: "-10px" }}>

            <Col md="8">
              {this.renderLinks()}
            </Col>

            <Col md="4">
              <br className="d-block d-md-none" />

              <div style={{ float: "right" }}>
                <span style={{ marginLeft: "10px", fontSize: "14px", color: "dimgrey" }}>
                  Copyright &copy; {(new Date().getFullYear())}
                </span>

                {
                  (isNarrowDisplay === true) &&
                  <div style={{ height: "15px" }} />
                }

                <img
                  // onClick={() => this.toggleModal(true, "What SAEON Offers", "http://www.example.com")}
                  src={nrf_seaon}
                  style={{
                    height: "40px",
                    marginTop: "-8px",
                    marginBottom: "-10px",
                    marginLeft: "20px",
                    // cursor: "pointer",
                    border: "0px solid grey"
                  }}
                  align="right"
                />
              </div>
            </Col>

          </Row>
        </MDBFooter>

        <Modal isOpen={showModal} toggle={() => this.toggleModal(false)} size="fluid" style={{ width: "95%" }} >
          <ModalHeader toggle={() => this.toggleModal(false)}>{modalHeader}</ModalHeader>
          <ModalBody>
            <iframe
              style={{
                width: "100%",
                height: "500px",
                margin: "0px",
                border: "1px solid gainsboro"
              }}
              src={modalSrc}
            />
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default Footer