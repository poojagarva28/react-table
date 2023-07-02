// import "./SimpleTable.css";
import FakeData from "../MockData2.json";
import { useTable, useColumnOrder } from "react-table";
import { useMemo } from "react";
import moment from "moment";

function ColumnOrder() {
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
    setColumnOrder,
  } = useTable(
    {
      columns,
      data,
    },
    useColumnOrder
  );

  const changeOrder = () => {
    setColumnOrder([
      "id",
      "first_name",
      "last_name",
      "phone",
      "country",
      "date_of_birth",
    ]);
  };

  return (
    <div className="SimpleTable">
      <div className="container">
        <button onClick={changeOrder}>Change column order</button>
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

export default ColumnOrder;
