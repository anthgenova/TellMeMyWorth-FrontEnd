import React, { Component } from "react";
import Joi from "joi-browser";
import FloorSweeperForm from "./floorSweeperForm";

import { getFloorSweeps } from "../services/floorSweepService";

class FloorSweeper extends Component {
  state = {
    // data: {
    //   policyId: "b2d25f829ebb7f4c97b5e847923a1115b23ebf78000722c229c9c9f7",
    //   perPage: 1,
    // },
    assets: [],
    // errors: {},
  };

  //   schema = {
  //     policyId: Joi.string().required().label("Policy Id"),
  //     perPage: Joi.number().required().label("Sweep Amount"),
  //   };

  //   doSubmit = async () => {
  //     console.log(
  //       await getFloorSweeps(this.state.data.policyId, this.state.data.perPage)
  //     );
  //     let assets = await getFloorSweeps(
  //       this.state.data.policyId,
  //       this.state.data.perPage
  //     );
  //     console.log(assets);
  //     // console.log(this.state.data.perPage);
  //     this.setState({ assets });

  //     console.log(this.state.assets);
  //   };

  render() {
    return (
      <div>
        <FloorSweeperForm />
      </div>
    );
  }
}

export default FloorSweeper;
