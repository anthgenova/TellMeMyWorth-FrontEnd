import React, { Component } from "react";

class Loading extends Component {
  state = {};

  componentDidMount() {
    this.props.history.push(
      this.props.location.pathname.replace("loading/", "")
    );
  }

  render() {
    return (
      <p className="position-absolute top-50 start-50 translate-middle">
        Sneaking through your wallet...
      </p>
    );
  }
}

export default Loading;
