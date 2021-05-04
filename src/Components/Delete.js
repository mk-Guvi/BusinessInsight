import React, { useState } from 'react'
import NavBar from './Navbar'
import {Link} from "react-router-dom"
import { Form, Alert, Button, FormControl } from 'react-bootstrap'
function Delete() {
  const [search, setSearch] = useState('')

  const [status, setStatus] = useState('')
  const [textUpdate, settextUpdate] = useState('')
  const [searchedCompany, setSearchedCompany] = useState([])
  const [selectvalue, setValue] = useState(false)
  const selectValue = (e) => {
    setValue(e.target.value)
  }

  const onSearch = (e) => {
    setSearch(e.target.value)
  }
  
  const updateText = (e) => {
    settextUpdate(e.target.value)
  }

  const updateResult = (e) => {
    if (textUpdate) {
      e.preventDefault()

      if (selectvalue === '1') {
        const reqBody = {
          company_name: search,
        }
        fetch(` http://localhost:8080/business/deleteCompany`, {
          headers: { 'Content-Type': 'application/json' },
          method: 'DELETE',
          mode: 'cors',
          body: JSON.stringify(reqBody),
        })
          .then((res) => {
            return res.json()
          })

          .then((data) => {
            setSearchedCompany(data.result)
            setStatus(data.status)
            alert(data.status)
            setSearch('')
            settextUpdate('')
          })

          .catch(console.error())
      } else if (selectvalue === '2') {
        const reqBody = {
          owners: search,
          updateOwners: textUpdate,
        }
        fetch(` http://localhost:8080/business/UpdateOwnersName`, {
          headers: { 'Content-Type': 'application/json' },
          method: 'PUT',
          mode: 'cors',
          body: JSON.stringify(reqBody),
        })
          .then((res) => {
            return res.json()
          })

          .then((data) => {
            setSearchedCompany(data.result)
            setStatus(data.status)
            alert(data.status)
            setSearch('')
            settextUpdate('')
          })

          .catch(console.error())
      } else if (selectvalue === '3') {
        const reqBody = {
          company_name: search,
          about: textUpdate,
        }
        fetch(` http://localhost:8080/business/UpdateAbout`, {
          headers: { 'Content-Type': 'application/json' },
          method: 'PUT',
          mode: 'cors',
          body: JSON.stringify(reqBody),
        })
          .then((res) => {
            return res.json()
          })

          .then((data) => {
            setSearchedCompany(data.result)
            setStatus(data.status)
            alert(data.status)
            setSearch('')
            settextUpdate('')
          })

          .catch(console.error())
      } else if (selectvalue === '4') {
        const reqBody = {
          company_name: search,
          employee_size: textUpdate,
        }
        fetch(` http://localhost:8080/business/UpdateEmployeeSize`, {
          headers: { 'Content-Type': 'application/json' },
          method: 'PUT',
          mode: 'cors',
          body: JSON.stringify(reqBody),
        })
          .then((res) => {
            return res.json()
          })

          .then((data) => {
            setSearchedCompany(data.result)
            setStatus(data.status)
            alert(data.status)
            setSearch('')
            settextUpdate('')
          })

          .catch(console.error())
      }
    }
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
                <Link to="/home"> Home</Link>
              </Button>
            </div>
            <div style={{ width: '15%' }} className="m-1 p-2  ">
              <Button variant="outline-info">
                <Link to="/home/ADD"> Add Company</Link>
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
            <h4>Select Update Item </h4>
            <Form.Control
              onChange={selectValue}
              id="optionSelected"
              as="select"
            >
              <option selected value="0">
                Delete By
              </option>
              <option value="1">company's Name</option>
            </Form.Control>
          </div>
          <div style={{ width: '35%' }} className="m-1 p-2 rounded border">
            <h5>Company/Owner Name</h5>

            <FormControl
              type="text"
              value={search}
              onChange={onSearch}
              placeholder="Enter Name"
            />
            {selectvalue === '2' ? (
              <Alert variant="info">Enter Owner's Name</Alert>
            ) : (
              <Alert variant="danger">Enter Company's Name</Alert>
            )}
          </div>
          <div style={{ width: '33%' }} className="m-1 p-2 rounded border ">
            <h5>ReEnter Company/Owner Name</h5>
            <FormControl
              type="text"
              value={textUpdate}
              placeholder="Enter Name"
              onChange={updateText}
            />
            <br />
            <Button
              style={{ marginRight: '70%' }}
              onClick={updateResult}
              variant="danger"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Delete
