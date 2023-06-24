// import "./SimpleTable.css";
import FakeData from "../MockData.json";
import { useTable } from "react-table";
import { useMemo } from "react";

function ColumnGroup() {
  const data = useMemo(() => FakeData, []);
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        Footer: "ID",
        accessor: "id",
      },
      {
        Header: "Name",
        Footer: "Name",
        columns: [
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
        ],
      },
      {
        Header: "Info",
        Footer: "Info",
        columns: [
          {
            Header: "Email",
            Footer: "Email",
            accessor: "email",
          },
          {
            Header: "Gender",
            Footer: "Gender",
            accessor: "gender",
          },
          {
            Header: "University",
            Footer: "University",
            accessor: "university",
          },
        ],
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
  } = useTable({
    columns,
    data,
  });

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

export default ColumnGroup;
