// import "./RowSelection.css";
import FakeData from "../MockData2.json";
import { useTable, useRowSelect } from "react-table";
import { useMemo } from "react";
import moment from "moment";
import { Checkbox } from "./Checkbox";

function RowSelection() {
  const data = useMemo(() => FakeData, []);
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        Footer: "ID",
        accessor: "id",
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

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data,
    },
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
        },
        ...columns,
      ]);
    }
  );

  const firstPageRows = rows.slice(0, 10);

  return (
    <div className="SimpleTable">
      <div className="container">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {firstPageRows.map((row) => {
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
        <pre>
          <code>
            {JSON.stringify(
              {
                selectedFlatRows: selectedFlatRows.map((row) => row.original),
              },
              null,
              2
            )}
          </code>
        </pre>
      </div>
    </div>
  );
}

export default RowSelection;
