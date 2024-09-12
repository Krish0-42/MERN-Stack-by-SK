import './App.css';
import React, { useState, useRef } from 'react';

function App() {
  const [jobList, setJobList] = useState([]);
  const [id, setId] = useState([]);
  const nameRef = useRef();
  const emailRef = useRef();
  const pswRef = useRef();
  const mobileRef = useRef();

  const getData = async () => {
    let res = await fetch("http://localhost:8080/getjob", { method: "GET" });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    let json = await res.json();
    console.log(json)
    setJobList(json)
  }

  const job_create = async () => {

    let data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: pswRef.current.value,
      mobile: mobileRef.current.value
    }

    let res = await fetch("http://localhost:8080/createJob",
      {
        method: "POST", body: JSON.stringify(data),
        headers: { "content-type": "application/json" }
      });

      // Automatically removes the entered data
      nameRef.current.value = " "
      emailRef.current.value = " "
      pswRef.current.value = " "
      mobileRef.current.value = " "

    let json = await res.json();
    console.log(json)
    getData()
  }

  const deleteJob = async (id) => {
    // $ aka string literal is used for to print var into the backtick symbol - '`' aka Template literals, allow for easier string interpolation and multiline strings.
    let res = await fetch(`http://localhost:8080/delete_id`, { method: "DELETE",headers:{"content-type" : "application/json"} , body:JSON.stringify({"id" : id})});
    if (res.ok) {
      alert("delete");
      getData()
    } else {
      alert("Can't delete");
    }
  }

  const loadDataForUpdate = (id) => {
    let matchJob = jobList.filter((j) => id == j._id)
    console.log(matchJob);
    setId(id);
    nameRef.current.value = matchJob[0].name;
  }

  const updateJob  = async (id) => {
    let data = {
      "id": id, 
      "name": nameRef.current.value,
      "email": emailRef.current.value,
      "password": pswRef.current.value,
      "mobile": mobileRef.current.value
    }

    let res = await fetch(" ", { method: "POST" })
    if (res.ok) {
      alert("update");
    } else {
      alert("Cant Update");
    }
  }
  return (
    <div>
      {
        jobList.map((obj, index) => {
          return (
            <div>
              {/* used for listing the db names */}
              <h1 key={index}> {obj.name} </h1>
              {/* use for deleting the id */}
              <button onClick={() => deleteJob(obj._id)}> Delete it </button>
              {/* use for Updating */}
              <button onClick={() => updateJob(obj._id)}> Update </button>

            </div>
          )
        })
      }

      <button onClick={getData}> Get Job List</button>

      <div>
        <h1> Create Form </h1>
        {/* add fields as per the requirements */}
        <div> <h6> New name: </h6> <input type="name" ref={nameRef} placeholder='New Name: ' /></div>
        <div> <h6> New email: </h6> <input type="email" ref={emailRef} placeholder='New Email: ' /></div>
        <div> <h6> New password: </h6> <input type="password" ref={pswRef} placeholder='New Password:' /></div>
        <div> <h6> New mobile: </h6> <input type="mobile_no" ref={mobileRef} placeholder='New Mobile: ' /></div>

        <button onClick={job_create}> Enter New Emp</button>
      </div>
    </div>
  );

}

// npm install cors in the express to retrieve the data
export default App;
