import React, { Component } from "react";
import Table from "./common/table";

class AssetsTable extends Component {
  columns = [
    { path: "optimized_source", label: "", type: "img", sortable: false },
    { path: "project.name", label: "Project", sortable: false },
    { path: "asset", label: "Asset", sortable: true },
    // { path: "valueBasedOn", label: "Based On", sortable: false },
    // { path: "value", label: "Value ₳", sortable: true },
    { path: "basedOnShown", label: "Based On", sortable: false },
    // { path: "valueShown", label: "Value ₳", sortable: true },
    { path: "valueShownVariable", label: "Value ₳", sortable: true },
    { path: "valueToggle", label: "Trait | Floor", sortable: false },
    { path: "customToggle", label: "Custom", sortable: false },
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

export default AssetsTable;
