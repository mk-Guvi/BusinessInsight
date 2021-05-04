import React, { useState, useEffect, useRef } from 'react'
import NavBar from './Navbar'
import { Button, FormControl } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const Home = () => {
  const InputRef = useRef(null)
  useEffect(() => {
    InputRef.current.focus()
  }, [])

  const [search, setSearch] = useState('')
  const [allCompany, setAllCompany] = useState([])
  const [status, setStatus] = useState('')
  const [searchedCompany, setSearchedCompany] = useState([])
  const selectedcompany = (e) => {
    e.preventDefault() //it prevents reloading the page after submitting form
    const reqBody = {
      company_name: e.target.value,
    }
    fetch(`http://localhost:8080/business/company`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(reqBody),
    })
      .then((res) => {
        return res.json()
      })

      .then((data) => {
        setSearchedCompany(data.result)
        setStatus(data.status)
        setSearch('')
      })

      .catch(console.error())
  }
  const onSearch = (e) => {
    setSearch(e.target.value)
  }

  const searchAllCompany = () => {
    fetch('http://localhost:8080/business', {
      mode: 'cors',
    })
      .then((res) => res.json())
      .then((data) => {
        setAllCompany(data.result)
      })
      .catch(console.error)
  }
  const searchByCompany = (e) => {
    if (search) {
      e.preventDefault()
      const reqBody = {
        company_name: search,
      }
      fetch(`http://localhost:8080/business/company`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(reqBody),
      })
        .then((res) => {
          return res.json()
        })

        .then((data) => {
          setSearchedCompany(data.result)
          setStatus(data.status)
          setSearch('')
        })

        .catch(console.error())
    }

    //   .finally(() => {
    //     setSubmit(false);
    //   });
  }

  const searchByOwner = (e) => {
    if (search) {
      e.preventDefault()
      const reqBody = {
        owners: search,
      }
      fetch(`http://localhost:8080/business/owners`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(reqBody),
      })
        .then((res) => {
          return res.json()
        })

        .then((data) => {
          setSearchedCompany(data.result)
          setStatus(data.status)
          console.log(searchedCompany)

          setSearch('')
        })

        .catch(console.error())
    }

    //   .finally(() => {
    //     setSubmit(false);
    //   });
  }

  return (
    <div className="App">
      <NavBar />
      <div className="container">
        <div className="d-flex flex-row mb-3 container">
          <div style={{ width: '30%' }} className="m-1 p-2 ">
            <FormControl
              type="text"
              ref={InputRef}
              value={search}
              onChange={onSearch}
              placeholder="Hunt The Insights By"
            />
          </div>
          <div style={{ width: '25%' }} className="m-1 p-2 ">
            <Button onClick={searchByCompany} variant="outline-info">
              Company's Name
            </Button>
          </div>
          <div
            style={{ width: '30%' }}
            onClick={searchByOwner}
            className="m-1 p-2 "
          >
            <Button variant="outline-info">Owners</Button>
          </div>
          <div style={{ width: '15%' }} className="m-1 p-2  ">
            <Button onClick={searchAllCompany} variant="outline-info">
              All
            </Button>
          </div>
        </div>
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
              <Link to="/home/ADD"> Add Company</Link>
            </Button>
          </div>
        </div>
      </div>
      {allCompany[0] !== undefined &&
        allCompany.map((each, eachIndex) => {
          return (
            <div key={eachIndex}>
              <Button
                onClick={selectedcompany}
                value={each.company_name}
                variant="outline-info"
              >
                {each.company_name}
              </Button>
            </div>
          )
        })}
      {status === 'company Found' || status === 'owner found' ? (
        <div className="d-flex flex-row mb-3 container">
          <div style={{ width: '33%' }} className="m-1 p-2 rounded border">
            <h5>Company Details</h5>

            <h6 className="mt-3" style={{ textAlign: 'left' }}>
              Company's Name:{'  '}
              <span style={{ textAlign: 'justify' }}>
                {searchedCompany.company_name}
              </span>
            </h6>
            <h6 className="mt-3" style={{ textAlign: 'left' }}>
              Location:{'  '}
              <span style={{ fontSize: '1rem', textAlign: 'justify' }}>
                {searchedCompany.address}
              </span>
            </h6>
            <h6 className="mt-3" style={{ textAlign: 'left' }}>
              Owners:
              <span>
                {searchedCompany.owners.map((each, Index) => {
                  return (
                    <span
                      key={Index}
                      style={{ fontSize: '0.7rem', textAlign: 'justify' }}
                    >{` ${each}`}</span>
                  )
                })}
              </span>
            </h6>
          </div>
          <div style={{ width: '33%' }} className="m-1 p-2 rounded border">
            <h4>About </h4>
            <h4 className="mt-3" style={{ textAlign: 'left' }}>
              <span style={{ fontSize: '0.9rem', textAlign: 'justify' }}>
                {searchedCompany.about}
              </span>
            </h4>
          </div>
          <div style={{ width: '33%' }} className="m-1 p-2 rounded border ">
            <h5>Employee_size</h5>
            <h6 className="mt-3" style={{ textAlign: 'left' }}>
              Employee Size: <br />
              <span style={{ fontSize: '2rem', marginLeft: '40%' }}>
                {searchedCompany.employee_size}
              </span>
            </h6>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-row mb-3 container">
          <div style={{ width: '33%' }} className="m-1 p-2 rounded border">
            <h5>Go</h5>
          </div>
          <div style={{ width: '33%' }} className="m-1 p-2 rounded border">
            <h5>Hunt</h5>
          </div>
          <div style={{ width: '33%' }} className="m-1 p-2 rounded border ">
            <h5>The Insights</h5>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
