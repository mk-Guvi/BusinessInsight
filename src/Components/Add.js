import React, { useState } from 'react'
import NavBar from './Navbar'
import {Link} from "react-router-dom"
import { Form, Alert, Button, FormControl } from 'react-bootstrap'
function Add() {
  const [companyName, setCompanyName] = useState('')
  const [location, setlocation] = useState('')
  const [about, setAbout] = useState('')
  const [employeesize, setEmployeeSize] = useState(0)
  const [ownersName, setOwnersName] = useState('')
  const [owners, setOwner] = useState([])
  const [status, setStatus] = useState('')

  const onlocation = (e) => {
    setlocation(e.target.value)
  }
  const onAbout = (e) => {
    setAbout(e.target.value)
  }

  const onOwnerName = (e) => {
    setOwnersName(e.target.value)
  }
  const onCompanyName = (e) => {
    setCompanyName(e.target.value)
  }
  const onEmployeeSize = (e) => {
    setEmployeeSize(e.target.value)
  }

  const ownerAdded = () => {
    if (ownersName) {
      setOwner([...owners, ownersName])
      setOwnersName('')
    }
  }
  const onUpdateResult = (e) => {
    e.preventDefault()
    const reqBody = {
      company_name: companyName,
      about,
      employee_size: employeesize,
      owners,
      address: location,
    }
    fetch(`http://localhost:8080/business`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(reqBody),
    })
      .then((res) => {
        return res.json()
      })

      .then((data) => {
        alert(data.status)
        setCompanyName('')
        setEmployeeSize(0)
        setAbout('')
        setlocation('')
        setOwner([])
      })

      .catch(console.error())
  }
  return (
    <div>
      <div className="App">
        <NavBar />
        <div className="container">
          <div className="d-flex flex-row mb-3 container">
            <div style={{ width: '20%' }} className="m-1 p-2  ">
              <Button variant="outline-info">
                {' '}
                <Link to="/home/update"> Update Company</Link>
              </Button>
            </div>
            <div style={{ width: '15%' }} className="m-1 p-2  ">
              <Button variant="outline-info">
                <Link to="/home/delete"> Delete Company</Link>
              </Button>
            </div>
            <div style={{ width: '15%' }} className="m-1 p-2  ">
              <Button variant="outline-info">
                <Link to="/home"> Home</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="d-flex flex-row mb-3 container">
            <div style={{ width: '3%' }} className="m-1 p-2  "></div>
          </div>
        </div>

        <div className="d-flex flex-row mb-3 container">
          <div style={{ width: '45%' }} className="m-1 p-2 rounded border">
            <h4>Company Details </h4>

            <FormControl
              required
              type="text"
              value={companyName}
              onChange={onCompanyName}
              placeholder="Enter company's Name"
            />
            <FormControl
              required
              type="text"
              value={location}
              onChange={onlocation}
              placeholder="Enter Location"
            />
            <FormControl
              required
              type="text"
              value={ownersName}
              onChange={onOwnerName}
              placeholder="Enter Owners Name "
            />
            <Button onClick={ownerAdded} variant="primary">
              Add
            </Button>
            {owners.map((each, Index) => {
              return <p key={Index}>{each}</p>
            })}
          </div>
          <div style={{ width: '35%' }} className="m-1 p-2 rounded border">
            <h5>About</h5>

            <FormControl
              required
              type="text"
              value={about}
              onChange={onAbout}
              placeholder="About Company"
            />
          </div>
          <div style={{ width: '33%' }} className="m-1 p-2 rounded border ">
            <h5>Employee Size</h5>
            <FormControl
              required
              type="number"
              value={employeesize}
              placeholder="Enter EmployeeSize"
              onChange={onEmployeeSize}
            />
            <br />
            <Alert variant="info">All the fields are required</Alert>
            <Button
              style={{ marginRight: '70%' }}
              onClick={onUpdateResult}
              variant="primary"
            >
              Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Add
