import React from 'react'
import './App.css'
import Login from './Components/Login'
import Home from './Components/Home'
import Add from './Components/Add'
import Update from './Components/Update'
import Delete from './Components/Delete'

import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route path="/home/delete">
            <Delete />
          </Route>
          <Route path="/home/ADD">
            <Add />
          </Route>
          <Route path="/home/update">
            <Update />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
