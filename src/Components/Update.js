import React, { useState } from 'react'
import NavBar from './Navbar'
import { Form, Alert, Button, FormControl } from 'react-bootstrap'
import { Link } from 'react-router-dom'
function Update() {
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
    if (selectvalue === '4') {
      if (isNaN(e.target.value)) {
        alert('Only Intergers')
        settextUpdate('')
      } else {
        settextUpdate(e.target.value)
      }
    } else {
      settextUpdate(e.target.value)
    }
  }

  const updateResult = (e) => {
    if (textUpdate) {
      e.preventDefault()

      if (selectvalue === '1') {
        const reqBody = {
          company_name: search,
          updateCompany_name: textUpdate,
        }
        fetch(` http://localhost:8080/business/UpdateCompanyName`, {
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
                <Link to="/home">Home Company</Link>
              </Button>
            </div>
            <div style={{ width: '15%' }} className="m-1 p-2  ">
              <Button variant="outline-info">
                <Link to="/home/delete"> Delete Company</Link>
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
              <option value="0">Update By</option>
              <option value="1">company's Name</option>
              <option value="2">Owner's Name</option>
              <option value="3">About</option>
              <option value="4">Employee Size</option>
            </Form.Control>
          </div>
          <div style={{ width: '35%' }} className="m-1 p-2 rounded border">
            <h5>Company/Owner Name</h5>

            <FormControl
              required
              type="text"
              value={search}
              onChange={onSearch}
              placeholder="Enter the Company/Owner"
            />
            {selectvalue === '2' ? (
              <Alert variant="info">Enter Owner's Name</Alert>
            ) : (
              <Alert variant="danger">Enter Company's Name</Alert>
            )}
          </div>
          <div style={{ width: '33%' }} className="m-1 p-2 rounded border ">
            <h5>Update Content</h5>
            <FormControl
              required
              type="text"
              value={textUpdate}
              onChange={updateText}
              placeholder="Update with"
            />
            <br />
            <Button
              style={{ marginRight: '70%' }}
              onClick={updateResult}
              variant="primary"
            >
              Update
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Update
