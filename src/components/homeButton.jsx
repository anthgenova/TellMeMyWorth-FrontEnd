import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class HomeButton extends Component {
  goHome = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <button
          onClick={this.goHome}
          className="btn btn-primary"
          style={{ margin: "0rem 0rem 0rem 0rem" }}
        >
          Home
        </button>
      </div>
    );
  }
}

export default HomeButton;
