import React, { Component } from "react";
import AdsTop from "./adsTop";
import AddrSearch from "./addrSearch";
import AddrUpdate from "./addrUpdate";

class WalletNew extends Component {
  render() {
    const { loading, history } = this.props;

    return (
      <div>
        <div className="px-4 my-1 text-center">
          <h1>First time here?</h1>{" "}
          <h6>
            Please consider donating to $TellMeMyWorth to help keep us alive.
          </h6>
        </div>
        <div className="col">
          {/* <AddrSearch history={history} loading={loading} /> */}

          <p className="px-4 py-1 my-3 text-center">
            It appears that we don't have this address logged...
          </p>
          <p>Follow these steps so you will be able to view your worth:</p>
          <p>
            {" "}
            1. Try clicking on "Update". We will import a snapshot of all the
            assets currently in your wallet.
          </p>
          <p>
            {" "}
            2. We add in the current amount of ADA in your wallet, so if your
            assets still aren't showing check that your address is correctly
            entered. You can check this in the URL. If an invalid address is
            showing in the URL, please Search for the correct wallet then follow
            step 1.
          </p>
          <p>
            {" "}
            3. Still not working? Message us on Discord so we can help you
            figure out how much your worth.{" "}
          </p>
          <p>
            {" "}
            *Disclaimer: We are still developing the site! We are working first
            to allow you to view all your unique 1 of 1 collections. We plan to
            eventually display all possible assets in your wallet, but this will
            take some time.
          </p>
        </div>
        <div className="col-2">
          {/* <AddrUpdate location={this.props.location.pathname} /> */}
        </div>
      </div>
    );
  }
}

export default WalletNew;
