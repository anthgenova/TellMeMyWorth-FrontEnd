import React, { Component } from "react";
import { withRouter } from "react-router";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import AssetsTable from "./assetsTable";
import AdsTop from "./adsTop";
import AddrSearch from "./addrSearch";
import AddrUpdate from "./addrUpdate";
import HomeButton from "./homeButton";
import WalletNew from "./walletNew";
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
    selectedProject: { name: "All Assets" },
    // totalValue: getTotalValue(),
    sortColumn: { path: "value", order: "desc" },
    loading: true,
  };

  async componentDidMount() {
    const { data } = await getProjects(this.props.location.pathname);
    const projects = [{ _id: "", name: "All Assets" }, ...data];

    const { data: assets } = await getAssets(this.props.location.pathname);
    this.setState({ assets, projects });
    demoAsyncCall().then(() => this.setState({ loading: false }));
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.addr !== prevProps.match.params.addr) {
      const { data } = await getProjects(this.props.location.pathname);
      const projects = [{ _id: "", name: "All Assets" }, ...data];

      const { data: assets } = await getAssets(this.props.location.pathname);
      this.setState({ assets, projects });
    }
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleProjectSelect = (project) => {
    this.setState({ selectedProject: project, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedProject,
      assets: allAssets,
    } = this.state;

    const filtered =
      selectedProject && selectedProject._id
        ? allAssets.filter((m) => m.project._id === selectedProject._id)
        : allAssets;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const assets = paginate(sorted, currentPage, pageSize);

    // console.log(this.state.selectedProject);

    const totalValue = filtered.reduce((a, b) => a + (b.value || 0), 0);

    return { totalCount: filtered.length, data: assets, totalValue };
  };

  render() {
    const { length: count } = this.state.assets;
    const { pageSize, currentPage, sortColumn, loading } = this.state;

    // if (loading) {
    //   // if your component doesn't have to wait for an async action, remove this block
    //   return <p>Sneaking through your wallet...</p>; // render null when app is not ready
    // }

    //if (count === 0) return <p>Sneaking through your wallet...</p>;

    const { totalCount, data: assets, totalValue } = this.getPageData();

    return (
      // <WalletNew history={this.props.history} loading={loading} />
      <div>
        {loading === false ? (
          <div className="row justify-content-center">
            {/* <AdsTop /> */}
            <div className="px-4 my-1 text-center">
              {totalCount !== 0 ? (
                <h1>
                  Your total value of {this.state.selectedProject.name} is{" "}
                  {totalValue.toLocaleString("en-US")}
                  ₳!
                </h1>
              ) : (
                <h3>First time here?</h3>
              )}

              <h6>
                Please consider donating to $TellMeMyWorth to help keep us
                alive.
              </h6>
              <div
                className="row justify-content-center"
                style={{ padding: "0rem 0rem 1.5rem 0rem" }}
              >
                <div className="col-auto pt-2">
                  <table className="pt-4">
                    <th className="px-4">
                      <AddrUpdate location={this.props.location.pathname} />
                    </th>
                    <th className="px-4">
                      <HomeButton history={this.props.history} />
                    </th>
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
                </>
              ) : (
                <h6>{this.props.location.pathname.replace("/", "")}</h6>
              )}
            </div>
            <div className="col order-md-1">
              {/* <AddrSearch history={this.props.history} loading={loading} /> */}
              {totalCount !== 0 ? (
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
                  <p>
                    {" "}
                    *Disclaimer: We are still developing the site! We are
                    working first to allow you to view all your unique 1 of 1
                    collections. We plan to eventually display all possible
                    assets in your wallet, but this will take some time.
                  </p>
                </>
              )}
            </div>
            <div className="col-md-2 order-md-2">
              {totalCount !== 0 ? (
                <ListGroup
                  items={this.state.projects}
                  selectedItem={this.state.selectedProject}
                  onItemSelect={this.handleProjectSelect}
                  style={{ marginTop: "0rem" }}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        ) : (
          <p className="position-absolute top-50 start-50 translate-middle">
            Sneaking through your wallet...
          </p>
        )}
      </div>
    );
  }
}

export default withRouter(Assets);
