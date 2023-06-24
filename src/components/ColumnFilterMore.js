// import "./SimpleTable.css";
import FakeData from "../MockData2.json";
import { useTable, useGlobalFilter, useFilters } from "react-table";
import { useMemo } from "react";
import moment from "moment";
import { useState } from "react";
import { useAsyncDebounce } from "react-table/dist/react-table.development";

function GlobalFilter({ filter, setFilter }) {
  const [value, setValue] = useState(filter);

  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 1000);

  return (
    <span>
      Search:
      <input
        type="text"
        value={value || ""}
        onChange={(e) => {
          setFilter(e.target.value);
          onChange(e.target.value);
        }}
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

function ColumnFilterMore() {
  const data = useMemo(() => FakeData, []);

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        Footer: "ID",
        accessor: "id",
        disableFilters: true,
      },
      {
        Header: "First Name",
        Footer: "First Name",
        accessor: "first_name",
      },
      {
        Header: "Last Name",
        Footer: "Last Name",
        accessor: "last_name",
      },
      {
        Header: "Email",
        Footer: "Email",
        accessor: "email",
      },
      {
        Header: "Date Of Birth",
        Footer: "Date Of Birth",
        accessor: "date_of_birth",
        Cell: ({ value }) => moment(value).format("MM-DD-YYYY"),
        disableFilters: true,
      },
      {
        Header: "Age",
        Footer: "Age",
        accessor: "age",
      },
      {
        Header: "Country",
        Footer: "Country",
        accessor: "country",
      },
      {
        Header: "Phone",
        Footer: "Phone",
        accessor: "phone",
      },
    ],
    []
  );

  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilterInput,
    };
  }, []);

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
      defaultColumn,
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

export default ColumnFilterMore;

/*
  disableFilters:true
  defaultColumn - to use common filterinput on every column instead of writing in individual columns
  debouncing
*/
