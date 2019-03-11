import React from 'react'
// import { Button, Input } from 'mdbreact'
// import './shared.css'

class MitigationAddStep extends React.Component {

  constructor(props) {
    super(props);

    // this.asResearchChecked = this.asResearchChecked.bind(this)
    // this.withFundingChecked = this.withFundingChecked.bind(this)
    // this.addMitigation = this.addMitigation.bind(this)

    // this.state = {
    //   asResearch: false,
    //   withFunding: false
    // }
  }

  // addMitigation(){

  //   let { onAddClick } = this.props
  //   let { asResearch, withFunding } = this.state

  //   if(onAddClick){
  //     onAddClick(asResearch, withFunding)
  //   }
  // }

  // asResearchChecked(){
  //   let { asResearch } = this.state
  //   this.setState({ asResearch: !asResearch })
  // }

  // withFundingChecked(){
  //   let { withFunding } = this.state
  //   this.setState({ withFunding: !withFunding })
  // }

  render() {

    // let { asResearch, withFunding } = this.state

    return (
      <>
        <h4>
          <i>*COMING SOON*</i>
        </h4>

        {/* <h5>
          Would you like to add a mitigation action to this project?
        </h5>

        <br />

        <h6>
          <b>
            Configure and add your mitigation.
          </b>          
        </h6>

        <Input disabled label="Include Funding Details (coming soon)" type="checkbox" id="withFundingCheck" checked={withFunding} onClick={this.withFundingChecked} />
        <Input label="Add As Research" type="checkbox" id="asResearchCheck" checked={asResearch} onClick={this.asResearchChecked} />

        <Button className="inline-button" color="primary" onClick={this.addMitigation}>
          Add Mitigation
        </Button> */}
      </>
    )
  }
}

export default MitigationAddStep