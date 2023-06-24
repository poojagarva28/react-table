// import "./SimpleTable.css";
import FakeData from "../MockData2.json";
import { useTable, useGlobalFilter, useFilters } from "react-table";
import { useMemo } from "react";
import moment from "moment";

function GlobalFilter({ filter, setFilter }) {
  return (
    <span>
      Search:
      <input
        type="text"
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </span>
  );
}

function ColumnFilterInput({ column }) {
  const { filterValue, setFilter } = column;
  return (
    <span>
      Search:
      <input
        type="text"
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </span>
  );
}

function ColumnFilter() {
  const data = useMemo(() => FakeData, []);
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        Footer: "ID",
        accessor: "id",
        Filter: ColumnFilterInput,
      },
      {
        Header: "First Name",
        Footer: "First Name",
        accessor: "first_name",
        Filter: ColumnFilterInput,
      },
      {
        Header: "Last Name",
        Footer: "Last Name",
        accessor: "last_name",
        Filter: ColumnFilterInput,
      },
      {
        Header: "Email",
        Footer: "Email",
        accessor: "email",
        Filter: ColumnFilterInput,
      },
      {
        Header: "Date Of Birth",
        Footer: "Date Of Birth",
        accessor: "date_of_birth",
        Cell: ({ value }) => moment(value).format("MM-DD-YYYY"),
        Filter: ColumnFilterInput,
      },
      {
        Header: "Age",
        Footer: "Age",
        accessor: "age",
        Filter: ColumnFilterInput,
      },
      {
        Header: "Country",
        Footer: "Country",
        accessor: "country",
        Filter: ColumnFilterInput,
      },
      {
        Header: "Phone",
        Footer: "Phone",
        accessor: "phone",
        Filter: ColumnFilterInput,
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter
  );

  const { globalFilter } = state;

  return (
    <div className="SimpleTable">
      <div className="container">
        <GlobalFilter
          filter={globalFilter}
          setFilter={setGlobalFilter}
        ></GlobalFilter>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                    <div>{column.canFilter ? column.render("Filter") : ""}</div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            {footerGroups.map((footerGroup) => (
              <tr {...footerGroup.getFooterGroupProps()}>
                {footerGroup.headers.map((column) => (
                  <td {...column.getFooterProps()}>
                    {column.render("Footer")}
                  </td>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default ColumnFilter;
