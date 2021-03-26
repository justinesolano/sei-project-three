import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Home from './components/Home'
import Register from './auth/Register'
import Login from './auth/Login'
import Explore from './components/Explore'
import UserProfile from './components/UserProfile'
const App = () => {

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/explore">
          <Explore />
        </Route>
        <Route exact path='/userprofile/:id'> 
          <UserProfile />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App