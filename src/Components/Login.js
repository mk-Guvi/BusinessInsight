import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Left from './Left'
import Right from './Right'
import NavBar from "./Navbar"

const Feature = () => {
  return (
    <div className="container">
          <NavBar />
      <Row>
        <Col>
          <Left />
        </Col>

        <Col>
          <Right />
        </Col>
      </Row>
    </div>
  )
}

export default Feature
