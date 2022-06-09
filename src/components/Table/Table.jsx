import React from "react";
import styles from "./table.module.css";
const Table = ({ data, handleDelete, handleSort, handleFilter,setLimit,setPage,limit,page,totalCount }) => {
  const filters = ["Revenue", "Tax", "Safety", "Force"];
  return (
    <div>
    <button disabled={page==1} onClick={()=>{
      setPage(page-1)
    }} >{"<"}</button>
      Filters:
      <select onChange={handleSort}>
        <option>Please select value</option>
        {filters.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
      <button value="asc" onClick={handleFilter}>
        AscToSalary
      </button>
      <button value="dsc" onClick={handleFilter}>
        DscToSalary
      </button>
      <button disabled={page>=totalCount*limit} onClick={()=>{
        setPage(page+1)
      }} >{">"}</button>
      {
        data.length ? (
          <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Address</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Married</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((ele) => (
            <tr key={ele.id}>
              <td> {ele.name} </td>
              <td> {ele.age} </td>
              <td> {ele.address} </td>
              <td> {ele.department} </td>
              <td> {ele.salary} </td>
              <td> {ele.maritalStatus ? "Married" : "Unmarried"} </td>
              <td>
                <button onClick={() => handleDelete(ele.id)}>
                  <img
                    src="https://endlessicons.com/wp-content/uploads/2012/12/trash-icon.png"
                    style={{ width: "40px" }}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        ) : (
          <h2>Data not available</h2>
        )
      }
    </div>
  );
};

export default Table;
