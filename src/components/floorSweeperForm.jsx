import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import FloorSweeperTable from "./floorSweeperTable";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { Link, NavLink } from "react-router-dom";
import _ from "lodash";
import CID from "cids";
import { isMobile } from "react-device-detect";
import HomeButton from "./homeButton";

import { getFloorSweeps } from "../services/floorSweepService";
import assets from "./assets";

class FloorSweeperForm extends Form {
  state = {
    data: {
      policyId: "",
      perPage: null,
    },
    sweeps: [],
    errors: {},
    currentPage: 1,
    pageSize: 100,
    sortColumn: { path: "listing_price", order: "asc" },
  };

  schema = {
    policyId: Joi.string().required().label("Policy Id"),
    perPage: Joi.number().required().min(1).max(50).label("Sweep Amount"),
  };
  //   async componentDidUpdate(prevProps, prevState) {
  //     if (this.state.assets !== prevState.assets) {
  //       // const { data } = await getProjects(this.props.location.pathname);
  //       // const projects = [{ _id: "", name: "All Assets" }, ...data];

  //       // const { data: assets } = await getAssets(this.props.location.pathname);
  //       let assets = await getFloorSweeps(
  //         this.state.data.policyId,
  //         this.state.data.perPage
  //       );

  //       this.setState({ assets });
  //       console.log("Updated");
  //       console.log(this.state.assets);
  //     }
  //     // console.log("DidUpdate" + this.state.loading);

  //     console.log("DidUpdate");
  //   }
  componentDidUpdate() {
    // const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    // this.setState({ movies: getMovies(), genres });
    // console.log("assets");
    // console.log(this.state.assets);
  }

  doSubmit = async () => {
    // console.log(
    //   await getFloorSweeps(this.state.data.policyId, this.state.data.perPage)
    // );
    let sweeps = await getFloorSweeps(
      this.state.data.policyId,
      this.state.data.perPage
    );
    // console.log(assets);
    // console.log(this.state.data.perPage);
    sweeps.map((sweep) => {
      const cid = new CID(
        sweep.onchain_data.image.replace("ipfs/", "").replace("ipfs://", "")
      )
        .toV1()
        .toString("base32");
      //   assetData["optimized_source"] = "https://" + cid + ".ipfs.infura-ipfs.io";

      sweep.optimized_source = "https://gateway.ipfs.io/ipfs/" + cid;
    });
    this.setState({ sweeps });

    // console.log(this.state.assets);
  };

  getPageData = () => {
    const { pageSize, currentPage, sortColumn, sweeps: allSweeps } = this.state;

    let filtered = allSweeps;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const sweeps = paginate(sorted, currentPage, pageSize);
    // console.log(sweeps);

    const totalValue = filtered.reduce(
      (a, b) => a + (b.listing_price || b.value || 0),
      0
    );

    return { totalCount: filtered.length, data: sweeps, totalValue };
  };

  render() {
    const { length: count } = this.state.sweeps;
    const { pageSize, currentPage, sortColumn } = this.state;

    // if (count === 0) return <p>There are no movies in the database.</p>;

    const { totalCount, data: sweeps, totalValue } = this.getPageData();

    return (
      <div>
        <div className="px-4 my-1 text-center">
          <h1>Floor Sweeper</h1>
          {/* {totalCount > 0 ? (
            <h2>You'll need {totalValue}₳ to sweep this floor</h2>
          ) : (
            <></>
          )} */}
          <h6>
            Please consider donating to $tellmemyworth to help keep us alive.
          </h6>{" "}
          <p>
            Follow us on{" "}
            <a
              href="https://twitter.com/TellMeMyWorth"
              target="_blank"
              className="link"
            >
              Twitter
            </a>{" "}
            to keep up with the latest news!
          </p>
        </div>
        <div
          className="row justify-content-center"
          style={{ padding: "0rem 0rem 1.5rem 0rem" }}
        >
          <div className="col-auto pt-2">
            <table className="pt-4">
              <thead>
                <tr>
                  <td className="px-4">
                    <Link to="/">
                      <button
                        //   onClick={this.state.history.push("/")}
                        className="btn btn-primary"
                        style={{ margin: "0rem 0rem 0rem 0rem" }}
                      >
                        Home
                      </button>
                    </Link>
                  </td>
                </tr>
              </thead>
            </table>
          </div>
        </div>

        <form className="row g-3" onSubmit={this.handleSubmit}>
          {!isMobile ? (
            <>
              <div className="col-8">
                {this.renderInput(
                  "policyId",
                  "Policy Id",
                  "Please enter policy id of project you want to sweep..."
                )}
              </div>
              <div className="col-2">
                {this.renderInput(
                  "perPage",
                  "Sweep Amount"
                  //   "How many are you sweeping?"
                )}
              </div>

              <div className="col-2">
                {this.renderButton("Sweep", "1.4rem 0.5rem 0rem 0rem")}
              </div>
            </>
          ) : (
            <div>
              {" "}
              {this.renderInput(
                "policyId",
                "Policy Id",
                "Please enter policy id of project you want to sweep..."
              )}
              {this.renderInput(
                "perPage",
                "Sweep Amount",
                "How many are you trying to sweep?"
              )}
              {this.renderButton("Sweep", "1.4rem 0.5rem 0rem 0rem")}
            </div>
          )}
        </form>
        {totalCount > 0 ? (
          <div>
            <h2 className="px-4 my-1 py-3 text-center" style={{}}>
              You'll need {totalValue.toLocaleString("en-US")}₳ to sweep this
              floor
            </h2>

            <FloorSweeperTable
              assets={sweeps}
              sortColumn={sortColumn}
              onSort={this.handleSort}
            />
          </div>
        ) : (
          <div>
            {" "}
            <p className="py-5 text-center" style={{ fontSize: 20 }}>
              {" "}
              Enter in the Policy Id and amount of floors to the Project you
              want to sweep.
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default FloorSweeperForm;
