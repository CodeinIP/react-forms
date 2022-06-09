import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "../Table/Table";
import styles from "./form.module.css";
const Form = () => {
  const initialValue = {
    maritalStatus: false,
  };
  const [form, setForm] = useState(initialValue);
  const [tableData, setTableData] = useState([]);
  const [sortValue, setSortValue] = useState("");
  const [data,setData] = useState();
  const[limit,setLimit] =useState(5);
  const[page,setPage] =useState(1);
  const[totalCount,setTotalCount]=useState();
  useEffect(() => {
    axios.get(`http://localhost:8080/employee?_limit=${limit}&_page=${page}`).then((r) => {
      setTotalCount(Number(r.headers["x-total-count"]));
      setTableData(r.data);
      // console.log(r.headers."x-total-count")
    });
  }, [limit,page]);
  const handleOnChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type == "checkbox") {
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
     axios({
      method:"post",
      url:"http://localhost:8080/employee",
      data:form,
      headers:{"Content-Type":"application/json"}
    })
    axios.get("http://localhost:8080/employee")
    .then((res)=>setTableData(res.data))
  };
  const handleDelete = (id) => {
    axios({
      method:"DELETE",
      url:"http://localhost:8080/employee/"+id
    }).then((res)=>console.log(res))
    axios.get("http://localhost:8080/employee")
    .then((res)=>setTableData(res.data))
  };
  const handleSort = async (e) => {
    console.log(e.target.value);
    let value = e.target.value;
    setSortValue(value);
    return await axios
      .get(`http://localhost:8080/employee?department=${value}&_order=asc`)
      .then((response) => {
        console.log(response.data);
        // let result = response.data.filter((ele)=>ele.department==value);
        setTableData(response.data);
        // console.log(result)
      })
      .catch((err) => console.log(err));
  };
  const handleFilter = async (e) => {
    let sortingValue = e.target.value;
    await axios.get("http://localhost:8080/employee").then((response) => {
      console.log(response.data);
      if (sortingValue == "asc") {
        let final = (response.data).sort(
          (a, b) => Number(a.salary) - Number(b.salary)
        );
        setTableData(final);
        console.log(final);
      } else if (sortingValue == "dsc") {
        let final = response.data.sort(
          (a, b) => Number(b.salary) - Number(a.salary)
        );
        setTableData(final);
        console.log(final);
      }
    });
  };

  return (
    <div className={styles.main}>
      <form className={styles.form} onSubmit={(e) => handleFormSubmit(e)}>
        <label htmlFor="">Name:</label>
        <input
          required
          name="name"
          onChange={(e) => handleOnChange(e)}
          type="text"
        />
        <br />
        <label htmlFor="">Age:</label>
        <input
          required
          name="age"
          onChange={(e) => handleOnChange(e)}
          type="number"
        />
        <br />

        <label htmlFor="">Address:</label>
        <input
          required
          name="address"
          onChange={(e) => handleOnChange(e)}
          type="text"
        />
        <br />
        <label htmlFor="">Department:</label>
        <select required onChange={(e) => handleOnChange(e)} name="department">
          <option value="">--</option>
          <option value="Revenue">Revenue</option>
          <option value="Tax">Tax</option>
          <option value="Safety">Safety</option>
          <option value="Force">Force</option>
        </select>
        <br />
        <label htmlFor="">Salary</label>
        <input
          required
          name="salary"
          onChange={(e) => handleOnChange(e)}
          type="number"
        />
        <br />
        <label htmlFor="">Tick if Married</label>
        <input
          name="maritalStatus"
          onChange={(e) => handleOnChange(e)}
          type="checkbox"
        />
        <button type="submit">Submit</button>
      </form>
      <Table
        data={tableData}
        handleDelete={handleDelete}
        handleSort={handleSort}
        handleFilter={handleFilter}
        setLimit={setLimit}
        setPage={setPage}
        limit={limit}
        page={page}
        totalCount={totalCount}
      />
    </div>
  );
};

export default Form;
