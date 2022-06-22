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

    const { data: assets } = await getAssets(this.props.location.pathname);
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

    const walletAssetCount = allAssets.length;
    let filtered = allAssets;
    if (searchQuery)
      filtered = allAssets.filter((m) =>
        m.asset.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedProject && selectedProject._id)
      filtered = allAssets.filter((m) => m.project._id === selectedProject._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const assets = paginate(sorted, currentPage, pageSize);

    // console.log(this.state.selectedProject);

    const totalValue = filtered.reduce((a, b) => a + (b.value || 0), 0);

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
      <div>
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
                Please consider donating to $TellMeMyWorth to help keep us
                alive.
              </h6>
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
                    are the prices you would recieve for a sale. This tool to
                    use to determine an estimated value of your wallet. We are
                    still developing the site! We are working first to allow you
                    to view all your unique 1 of 1 collections. We plan to
                    eventually display all possible assets in your wallet, but
                    this will take some time.
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
                    style={{ marginTop: "0rem" }}
                  />
                </>
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
