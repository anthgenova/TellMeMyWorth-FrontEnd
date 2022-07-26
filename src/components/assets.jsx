import React, { Component } from "react";
import { useState } from "react";
import { withRouter } from "react-router";
import { Checkbox } from "./common/checkbox";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import AssetsTable from "./assetsTable";
import AdsTop from "./adsTop";
import AddrSearch from "./addrSearch";
import AddrUpdate from "./addrUpdate";
import HomeButton from "./homeButton";
import WalletNew from "./walletNew";
import SearchBox from "./searchBox";
import { paginate } from "../utils/paginate";
import { getAssets, getTotalValue } from "../services/walletService";
import { getProjects } from "../services/projectService";
import _ from "lodash";
import { isMobile } from "react-device-detect";

function demoAsyncCall() {
  return new Promise((resolve) => setTimeout(() => resolve(), 3000));
}

class Assets extends Component {
  state = {
    assets: [],
    projects: [],
    pageSize: 10,
    currentPage: 1,
    searchQuery: "",
    selectedProject: { name: "All Assets" },
    // totalValue: getTotalValue(),
    sortColumn: { path: "value", order: "desc" },
    loading: true,
  };

  async componentDidMount() {
    const { data } = await getProjects(this.props.location.pathname);
    const projects = [{ _id: "", name: "All Assets" }, ...data];

    const projectCount = projects.length;
    if (projectCount > 20) {
      this.setState({ pageSize: 20 });
    } else if (projectCount > 10) {
      this.setState({ pageSize: projectCount });
    }

    const { data: assets } = await getAssets(this.props.location.pathname);
    // console.log(assets);

    this.setState({ assets, projects });
    demoAsyncCall().then(() => this.setState({ loading: false }));
    // console.log("DidMount" + this.state.loading);
  }

  // async componentDidMount() {
  //   console.log(this.props.location);
  // }

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.addr !== prevProps.match.params.addr) {
      const { data } = await getProjects(this.props.location.pathname);
      const projects = [{ _id: "", name: "All Assets" }, ...data];

      const { data: assets } = await getAssets(this.props.location.pathname);
      this.setState({ assets, projects });
    }
    // console.log("DidUpdate" + this.state.loading);
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleProjectSelect = (project) => {
    this.setState({
      selectedProject: project,
      searchQuery: "",
      currentPage: 1,
    });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleToggle = (asset, data) => {
    // console.log(data);

    // console.log("hi");
    // console.log(asset._id);
    // console.log(this.state.assets[0]._id);
    // console.log(this.state.assets);
    // const [assets, setData] = useState(initialState);
    // const index = this.state.assets.findIndex((p) => p._id === asset._id);
    // // this.state.assets[index].value.setState(this.state.assets[index].floor);
    // if (this.state.assets[index].valueShown === asset.value) {
    //   this.state.assets[index].valueShown = asset.floor;
    //   this.state.assets[index].basedOnShown = "Floor";
    // } else {
    //   this.state.assets[index].valueShown = asset.value;
    //   this.state.assets[index].basedOnShown = asset.valueBasedOn;
    // }
    // console.log(this.state.assets[index].valueShown);
    // console.log(this.state.assets[index].basedOnShown);

    const newState = this.state.assets.map((obj) => {
      if (obj._id === asset._id) {
        // console.log("*************");
        // console.log(obj._id);
        // this.state.assets[index].value = asset.floor;
        if (obj.valueShown === asset.value) {
          data[asset._id] = "Floor";
          return { ...obj, valueShown: asset.floor, basedOnShown: "Floor" };
        } else {
          delete data[asset._id];

          return {
            ...obj,
            valueShown: asset.value,
            basedOnShown: asset.valueBasedOn,
          };
        }

        // return { ...obj, valueShown: 0 };
      }
      return obj;
    });

    this.setState({ assets: newState });
    localStorage.setItem("myData", JSON.stringify(data));
    // console.log(JSON.parse(localStorage.getItem("myData")));

    // setAssets(newState);

    // this.setState({assets assets[index].value});
    // if (this.state.assets._id === asset._id) {
    //   console.log(this.state.assets._id);
    // }
    // this.setState({ assets: asset });
    // setIsChecked(!isChecked);
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedProject,
      searchQuery,
      assets: allAssets,
    } = this.state;

    // const filtered =
    //   selectedProject && selectedProject._id
    //     ? allAssets.filter((m) => m.project._id === selectedProject._id)
    //     : allAssets;
    // const [isChecked, setIsChecked] = useState(false);
    let data = {};
    // console.log(localStorage.getItem("myData"));
    if (localStorage.getItem("myData")) {
      data = JSON.parse(localStorage.getItem("myData"));
      // data = JSON.parse(data);
    } else {
      // let data = {};
    }

    allAssets.forEach((asset) => {
      try {
        // const index = asset.findIndex((p) => p._id === asset._id);
        if (data[asset._id]) {
          asset["basedOnShown"] = data[asset._id];
          asset["valueShown"] = asset.floor;
          // console.log(asset.basedOnShown);
        }
      } catch {}

      if (
        asset.assetType === "Nft" &&
        asset.valueBasedOn !== "Floor" &&
        asset.valueBasedOn !== "No Data"
      ) {
        // console.log(asset.basedOnShown);
        asset["valueToggle"] = (
          <div className="form-check form-switch">
            {asset.basedOnShown === "Floor" ? (
              <input
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckChecked"
                onChange={() => this.handleToggle(asset, data)}
                checked
              />
            ) : (
              <input
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckChecked"
                onChange={() => this.handleToggle(asset, data)}
                // checked
              />
            )}
            {/* <label class="form-check-label" for="flexSwitchCheckChecked">
            Checked switch checkbox input
          </label> */}
          </div>
        );
      }
    });

    const walletAssetCount = allAssets.length;
    let filtered = allAssets;
    if (searchQuery) {
      // try {
      filtered = allAssets.filter((m) => {
        if (m.asset) {
          // console.log(
          //   m.asset.toLowerCase().startsWith(searchQuery.toLowerCase())
          // );
          m.asset.toLowerCase().startsWith(searchQuery.toLowerCase());
        }
      });
      // console.log(filtered);
      // } catch {}
    } else if (selectedProject && selectedProject._id)
      filtered = allAssets.filter((m) => m.project._id === selectedProject._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const assets = paginate(sorted, currentPage, pageSize);

    // console.log(this.state.selectedProject);

    const totalValue = filtered.reduce(
      (a, b) => a + (b.valueShown || b.value || 0),
      0
    );
    // console.log(walletAssetCount);

    return {
      totalCount: filtered.length,
      data: assets,
      totalValue,
      walletAssetCount,
    };
  };

  render() {
    const { length: count } = this.state.assets;
    const { pageSize, currentPage, sortColumn, loading, searchQuery } =
      this.state;

    // if (loading) {
    //   // if your component doesn't have to wait for an async action, remove this block
    //   return <p>Sneaking through your wallet...</p>; // render null when app is not ready
    // }

    //if (count === 0) return <p>Sneaking through your wallet...</p>;
    const {
      totalCount,
      data: assets,
      totalValue,
      walletAssetCount,
    } = this.getPageData();

    return (
      // <WalletNew history={this.props.history} loading={loading} />
      <div className="assetsPage">
        {loading === false ? (
          <div className="row justify-content-center">
            {/* <AdsTop /> */}
            <div className="px-4 my-1 text-center">
              {walletAssetCount !== 0 ? (
                <h1>
                  Your total value of{" "}
                  {searchQuery.length === 0 ? (
                    this.state.selectedProject.name
                  ) : (
                    <>assets starting with "{searchQuery}"</>
                  )}{" "}
                  is {totalValue.toLocaleString("en-US")}
                  ₳!
                </h1>
              ) : (
                <h3>First time here?</h3>
              )}
              <h6>
                Please consider donating to $tellmemyworth to help keep us
                alive.
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
              <div
                className="row justify-content-center"
                style={{ padding: "0rem 0rem 1.5rem 0rem" }}
              >
                <div className="col-auto pt-2">
                  <table className="pt-4">
                    <thead>
                      <tr>
                        <td className="px-4">
                          <AddrUpdate location={this.props.location.pathname} />
                        </td>
                        <td className="px-4">
                          <HomeButton history={this.props.history} />
                        </td>
                      </tr>
                    </thead>
                  </table>
                </div>
              </div>
              {isMobile ? (
                <>
                  <p>
                    {this.props.location.pathname
                      .replace("/", "")
                      .substring(0, 40)}
                  </p>
                  <p>
                    {this.props.location.pathname
                      .replace("/", "")
                      .substring(40)}
                  </p>
                  {/* <h7>
                    {this.props.location.pathname
                      .replace("/", "")
                      .substring(10)}
                  </h7> */}
                  <SearchBox value={searchQuery} onChange={this.handleSearch} />
                </>
              ) : (
                <h6>{this.props.location.pathname.replace("/", "")}</h6>
              )}
            </div>
            <div
              className="col order-md-1"
              style={
                isMobile ? { marginTop: "0rem" } : { marginTop: "1.25rem" }
              }
            >
              {/* <AddrSearch history={this.props.history} loading={loading} /> */}
              {walletAssetCount !== 0 ? (
                <>
                  <AssetsTable
                    assets={assets}
                    sortColumn={sortColumn}
                    onSort={this.handleSort}
                  />
                  <Pagination
                    itemsCount={totalCount}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange}
                  />
                </>
              ) : (
                <>
                  {" "}
                  <p></p>
                  <p className="pt-5">
                    It appears that we don't have this address logged.
                  </p>
                  <p>
                    Follow these steps so you will be able to view your worth:
                  </p>
                  <p>
                    {" "}
                    1. Click on "Update". We will import a snapshot of all the
                    assets currently in your wallet. Any time your wallet's
                    assets change you can click this button to take a new
                    snapshot.
                  </p>
                  <p>
                    {" "}
                    2. We add in the current amount of ADA in your wallet, so if
                    your assets still aren't showing check that your address is
                    correctly entered. If an invalid address was entered, please
                    return home and search for the correct wallet then follow
                    step 1.
                  </p>
                  <p>
                    {" "}
                    3. Still not working? Message us on Discord so we can help
                    you figure out how much you're worth.{" "}
                  </p>
                  <p style={{ fontSize: 14 }}>
                    {" "}
                    *Disclaimer: Values presented are not meant to be a
                    definitive price. We cannot guarantee the prices displayed
                    are the prices you would recieve for a sale. This tool is
                    used to determine an estimated value of your wallet. We are
                    still developing the site! We plan to eventually display all
                    possible assets in your wallet, but this will take some
                    time.
                  </p>
                </>
              )}
            </div>
            <div className="col-md-2 order-md-2">
              {walletAssetCount !== 0 ? (
                <>
                  {isMobile ? (
                    <></>
                  ) : (
                    <SearchBox
                      value={searchQuery}
                      onChange={this.handleSearch}
                    />
                  )}

                  <ListGroup
                    items={this.state.projects}
                    selectedItem={this.state.selectedProject}
                    onItemSelect={this.handleProjectSelect}
                    style={{ marginTop: "0rem", marginBottom: "2rem" }}
                  />
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        ) : (
          <div className="loading">
            <p className="position-absolute top-50 start-50 translate-middle">
              Sneaking through your wallet...
            </p>
            <p className="position-absolute top-50 start-50 translate-middle">
              <br></br>
              <br></br>
              <br></br>(Please allow 1 second per 10 assets in your wallet)
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Assets);
