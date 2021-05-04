import React, { useEffect, useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import spinner from '../images/spinner.svg'
import { useHistory } from 'react-router-dom'
const Left = () => {
  const [inputText, setInputText] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')
  const [isSubmit, setisSubmit] = useState(false)
  const [login, setLogin] = useState(false)
  const [jwtKey, setJwtKey] = useState(null)
  const history = useHistory()
  useEffect(() => {
    storeCollector()
  }, [])
  const storeCollector = () => {
    let store = JSON.parse(localStorage.getItem('loginDetails'))
    if (store && store.login) {
      setLogin({ login: true })
      setJwtKey({ jwtKey: store })
    }
  }
  const onChangeInput = (e) => {
    setInputText(e.target.value)
  }
  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }
  let ac = new AbortController()

  const onFormSUbmit = (e) => {
    setisSubmit(true)
    e.preventDefault()
    const reqBody = {
      adminName: inputText,
      password,
    }

    fetch('http://localhost:8080/admin/login', {
      headers: { 'Content-Type': 'application/json' }, //the server will not understand that the data sent is in json format,that why the header content type is used
      method: 'POST',
      mode: 'cors',
      signal: ac.signal,
      body: JSON.stringify(reqBody),
    })
      .then((res) => {
        return res.json()
      })

      .then((result) => {
        setStatus(result.status)
        localStorage.setItem(
          'loginDetails',
          JSON.stringify({ login: true, token: result.jwtToken }),
        )
        storeCollector()
      })
      .catch(console.error())
    return () =>
      ac.abort().finally(() => {
        setisSubmit(false)
      })
  }
  const showhide = () => {
    var x = document.getElementById('password')
    if (x.type === 'password') {
      x.type = 'text'
    } else {
      x.type = 'password'
    }
  }
  return (
    <div>
      {login ? (
        history.push('/home')
      ) : (
        <div
          className="container p-2 rounded  m-5 border"
          style={{ textAlign: 'left' }}
        >
          <h1 style={{ textAlign: 'center', marginBottom: '-5%' }}>Login</h1>
          <Form
            onSubmit={onFormSUbmit}
            style={{ width: '80%', marginLeft: '10%', marginTop: '10%' }}
          >
            <Form.Group>
              <Form.Label htmlFor="Name">Enter your Name</Form.Label>
              <Form.Control
                type="text"
                value={inputText}
                onChange={onChangeInput}
                name="Name"
                id="Name"
                required
                placeholder="Enter your Name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password">Enter your password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={password}
                onChange={onChangePassword}
                required
                data-toggle="password"
                id="password"
                placeholder="Enter your password"
              />
              <Form.Check
                inline
                label="show Password"
                onClick={showhide}
                name="group1"
                type="checkbox"
              />
              {status === 'Invalid user/password' && (
                <Alert variant="danger">Invalid user/password</Alert>
              )}
            </Form.Group>
            {isSubmit ? (
              <img src={spinner} style={{ width: '10%' }} alt="spinner" />
            ) : (
              <Button type="submit">Submit</Button>
            )}
          </Form>
        </div>
      )}
    </div>
  )
}

export default Left
