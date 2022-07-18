import React, { Component } from "react";
import { useState } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { addWalletAssets } from "../services/walletService";

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// let buttonText = 'Update'
class AddrUpdate extends Component {
  // const [buttonText, setButtonText] = useState("click");

  state = {
    text: "Update",
    buttonFill: "btn btn-primary",
  };

  doUpdate = async () => {
    this.setState({ text: "Loading" });
    this.setState({ buttonFill: "btn btn-primary disabled" });
    // console.log(this.state.text);
    let loadTime = await addWalletAssets(this.props.location);
    // console.log(loadTime.data.count);
    await timeout(100 * loadTime.data.count);
    window.location.reload(false);
  };

  render() {
    return (
      <div>
        <button
          onClick={this.doUpdate}
          className={this.state.buttonFill}
          style={{ margin: "0rem 0rem 0rem 0rem" }}
        >
          {this.state.text}
        </button>
      </div>
    );
  }
}

export default AddrUpdate;
