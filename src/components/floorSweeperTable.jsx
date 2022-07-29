import React, { Component } from "react";
import Table from "./common/table";

class FloorSweeperTable extends Component {
  columns = [
    { path: "optimized_source", label: "", type: "img", sortable: false },
    // { path: "project.name", label: "Project", sortable: false },
    { path: "onchain_data.name", label: "Asset", sortable: false },
    // { path: "valueBasedOn", label: "Based On", sortable: false },
    // { path: "value", label: "Value ₳", sortable: true },
    { path: "rarity_rank", label: "Rarity", sortable: false },
    // { path: "valueShown", label: "Value ₳", sortable: true },
    { path: "listing_price", label: "Price", sortable: false },
    { path: "listing_marketplace", label: "Marketplace", sortable: false },
    // { path: "valueToggle", label: "Trait | Floor", sortable: false },
    // { path: "customToggle", label: "Custom", sortable: false },
  ];

  render() {
    const { assets, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={assets}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default FloorSweeperTable;
