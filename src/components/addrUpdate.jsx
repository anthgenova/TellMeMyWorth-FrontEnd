import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { addWalletAssets } from "../services/walletService";

class AddrUpdate extends Component {
  doUpdate = () => {
    addWalletAssets(this.props.location);
    window.location.reload(false);
  };

  render() {
    return (
      <div>
        <button
          onClick={this.doUpdate}
          className="btn btn-primary"
          style={{ margin: "0rem 0rem 0rem 0rem" }}
        >
          Update
        </button>
      </div>
    );
  }
}

export default AddrUpdate;
