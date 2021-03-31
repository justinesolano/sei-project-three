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
import Map from './components/Map'
import AddCommentsToProfile from './components/AddCommentsToProfile'
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
        <Route path="/destinations/:id">
          <Destination />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/explore">
          <Explore />
        </Route>
        <Route exact path="/feed">
          <ExploreDestination />
        </Route>
        <Route exact path='/profile/:id'> 
          <UserProfile />
        </Route>
        <Route exact path='/userprofile/:id/map'>
          <Map /> 
        </Route>
        <Route path='/addpicturetoprofile'>
          <AddPictureToProfile /> 
        </Route>
        <Route path='/profile/:id/showcomments'>
          <AddCommentsToProfile /> 
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App