import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Home from './components/Home'
import Destination from './components/Destination'
import Register from './auth/Register'
import Login from './auth/Login'
import Explore from './components/Explore'
import ExploreDestination from './components/ExploreDestination'
import UserProfile from './components/UserProfile'
import AddPictureToProfile from './components/AddPictureToProfile'
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
        <Route path="/destination/:id">
          <Destination />
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
        <Route exact path="/feed">
          <ExploreDestination />
        </Route>
        <Route exact path='/userprofile/:id'> 
          <UserProfile />
        </Route>
        <Route exact path='/addpicturetoprofile'>
          <AddPictureToProfile /> 
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App