import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;
    // console.log(column.sortable);

    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };

  render() {
    return (
      <thead>
        <tr className="tr">
          {React.Children.toArray(
            this.props.columns.map((column) => (
              <>
                {column.sortable ? (
                  <th
                    className="clickable"
                    key={column.path || column.key}
                    onClick={() => this.raiseSort(column.path)}
                  >
                    {column.label} {this.renderSortIcon(column)}
                  </th>
                ) : (
                  <th className="un-clickable" key={column.path || column.key}>
                    {column.label}
                  </th>
                )}
              </>
            ))
          )}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
