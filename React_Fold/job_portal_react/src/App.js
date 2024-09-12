import './App.css';
import React, { useState, useRef } from 'react';

function App() {
  const [jobList, setJobList] = useState([]);
  const nameRef  = useRef();
  const cnameRef = useRef();

  const getData = async () => {
    
      // IN THE EMPTY STR ADD YOUR JOBCALL.JS
      // http://localhost:8080/createJob add this
      let res = await fetch("http://localhost:8080/getjob", { method: "GET" });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      let json = await res.json();
      console.log(json)
      setJobList(json)
  }

  const job_create = async() => {

    let data = {
      name: nameRef.current.value,
      company_name : cnameRef.current.value,
    }

    let res = await fetch("http://localhost:8080/createJob", 
      { 
        method : "POST", body:JSON.stringify(data), 
        headers : {"content-type" : "application/json"}
      });

      let json = await res.json();
      console.log(json)
    getData()
  }
    
  return (
    <div>
      {
        jobList.map((obj, index) => {
          return(
            <h1> { obj.name } </h1>
          )
        })
      }
      <button onClick = { getData }> Get Job List</button>
      <div> 
        <h1> Create Form </h1> 
        {/* add fields as per the requirements */}
        <div> <input type = "name" ref = { nameRef } placeholder = 'New Name'/></div>
        <div> <input type = "name" ref = { cnameRef } placeholder = 'Company Name'/></div>
        <div> <input type = "button" onClick = { job_create } placeholder = 'Click'/></div>
      </div>
    </div>
  );

}

// npm install cors in the express to retrieve the data
export default App;
