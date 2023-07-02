// import "./SimpleTable.css";
import FakeData from "../MockData2.json";
import { useTable, useBlockLayout } from "react-table";
import { useMemo } from "react";
import moment from "moment";
import { useSticky } from "react-table-sticky";
import { Styles } from "./TableStyles";

function StickyTable() {
  const data = useMemo(() => FakeData, []);
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        Footer: "ID",
        accessor: "id",
        sticky: "left",
      },
      {
        Header: "First Name",
        Footer: "First Name",
        accessor: "first_name",
        sticky: "left",
      },
      {
        Header: "Last Name",
        Footer: "Last Name",
        accessor: "last_name",
        sticky: "left",
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
  } = useTable(
    {
      columns,
      data,
    },
    useBlockLayout,
    useSticky
  );

  const firstPageRows = rows.slice(0, 20);

  return (
    <div className="SimpleTable">
      <div className="container">
        <Styles>
          <div
            {...getTableProps()}
            className="table sticky"
            style={{ width: 1000, height: 500 }}
          >
            <div className="header">
              {headerGroups.map((headerGroup) => (
                <div {...headerGroup.getHeaderGroupProps()} className="tr">
                  {headerGroup.headers.map((column) => (
                    <div {...column.getHeaderProps()} className="th">
                      {column.render("Header")}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div {...getTableBodyProps()} className="body">
              {firstPageRows.map((row) => {
                prepareRow(row);
                return (
                  <div {...row.getRowProps()} className="tr">
                    {row.cells.map((cell) => (
                      <div {...cell.getCellProps()} className="td">
                        {cell.render("Cell")}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
            {/* <div className="footer">
              {footerGroups.map((footerGroup) => (
                <div {...footerGroup.getHeaderGroupProps()} className="tr">
                  {footerGroup.headers.map((column) => (
                    <div {...column.getHeaderProps()} className="td">
                      {column.render("Footer")}
                    </div>
                  ))}
                </div>
              ))}
            </div> */}
          </div>
        </Styles>
      </div>
    </div>
  );
}

export default StickyTable;
