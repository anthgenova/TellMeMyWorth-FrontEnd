import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import config from "../config.json";
import axios from "axios";

class AddrSearch extends Form {
  state = { data: { addr: "" }, errors: {} };

  schema = {
    addr: Joi.string().required().label("Address"),
  };

  doSubmit = () => {
    // console.log("Submitted", this.props.history);
    this.props.history.push("/loading/" + this.state.data.addr);
    // setTimeout(2500);
    // this.props.history.push("/" + this.state.data.addr);
    // console.log(this.props.loading);
    // this.props.loading = true;
    // console.log(this.props.loading);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput(
            "addr",
            "Address",
            "Please enter your address starting with 'stake' or 'addr'..."
          )}
          {this.renderButton("Search", "0.5rem 0.5rem 0rem 0rem")}
        </form>
      </div>
    );
  }
}

export default AddrSearch;
