import React, { Component } from "react";
import Table from "./common/table";

class AssetsTable extends Component {
  columns = [
    { path: "optimized_source", label: "", type: "img", sortable: false },
    { path: "project.name", label: "Project", sortable: false },
    { path: "asset", label: "Asset", sortable: true },
    { path: "bestTrait", label: "Best Trait", sortable: false },
    { path: "value", label: "Value ₳", sortable: true },
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
