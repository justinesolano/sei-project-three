import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import jetflixLogo from '../assets/jetflixlogo.png'
import Select from 'react-select'
import { continentOptions, suitableOptions, tagOptions } from './data/searchData'
import { userIsAuthenticated } from '../helpers/auth'
import { useHistory, useLocation } from 'react-router-dom'
// import axios from 'axios'


const groupedOptions = [
  { label: 'Continents', options: continentOptions },
  { label: 'Suitable For', options: suitableOptions },
  { label: 'Tags', options: tagOptions }
]

const Navbar = () => {

  const [formdata, setFormdata] = useState({
    search: []
  })

  const handleMultiChange = (selected, name) => {
    const values = selected ? selected.map(item => item.value) : []
    setFormdata({ ...formdata, [name]: [...values] })
  }

  const location = useLocation()
  
  useEffect(() => {
  }, [location.pathname])

  const history = useHistory()

  const [show, handleShow] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 1) {
        handleShow(true)
      } else handleShow(false)
    })
    return () => {
      window.removeEventListener('scroll', window)
    }
  })

  const [burger, setBurger] = useState('')

  const toggleBurger = () => {
    if (burger === '') setBurger('is-active')
    if (burger === 'is-active') setBurger('')
  }

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    history.push('/')
  }

  // const params = useParams()

  // const [myProfile, setMyProfile] = useState('')



  // const handleMyProfile = async event => {
  //   setMyProfile(event.target.name)
  //   console.log('>>>', myProfile, event.target)
  //   const token = window.localStorage.getItem('token')
  //   console.log('TOKEN',token)
  //   await axios.post(`/api/myprofile/${params.username}`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     })
  // }



  // const handleMyProfile = async event => {
  //   setMyProfile(event.target.name)
  //   const token = window.localStorage.getItem('token')
  //   await axios.get(`/api/profiles/${id}`, myProfile,
  //     console.log('TOKEN', token),
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     })
  // }

  // const handleMyProfile = async () => {
  //   const response = await axios.post('/api/profiles')
  //   window.localStorage.setItem('token', response.data.token)
  // }

  return (
    <nav className={`navbar is-fixed-top is-black ${show && 'is-info'}`} role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item" >
          <img src={jetflixLogo} className="jetflix" />
        </Link>
        <div onClick={toggleBurger} className={`navbar-burger ${burger}`} data-target="jetflix-navbar">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </div>
      </div>
      <div id="jetflix-navbar" className={`navbar-menu ${burger}`}>
        <div className="navbar-start">
          <Link to="/home" className="navbar-item">Home</Link>
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">
                More
            </a>
            <div className="navbar-dropdown">
              { !userIsAuthenticated() &&
            <>
              <Link to="/home" className="navbar-item">
                  My List
              </Link>
              <Link to="/explore" className="navbar-item">
                  Explore
              </Link>
              <Link to="/feed" className="navbar-item">
                  Feed
              </Link>
            </>
              }
              { userIsAuthenticated() &&
              <>
                <Link to="/myprofile" className="navbar-item">
              My Profile
                </Link>
                <Link to="/home" className="navbar-item">
              My List
                </Link>
                <Link to="/explore" className="navbar-item">
              Explore
                </Link>
                <Link to="/feed" className="navbar-item">
              Feed
                </Link>
              </>
              }
            </div>
          </div>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <Select className="search-bar-link"
              options={groupedOptions}
              isMulti
              name="search"
              placeholder="Find your paradise here"
              onChange={(selected) => handleMultiChange(selected, 'search')}
            />
          </div>
          { !userIsAuthenticated() &&
          <div className="navbar-item">
            <div className="buttons">
              <Link to="/register" className="button is-dark">
                <strong>Sign up</strong>
              </Link>
              <Link to="/login" className="button is-dark">
                <strong>Log in</strong>
              </Link>
            </div>
          </div>
          }
          { userIsAuthenticated() &&
            <div className="navbar-item">
              <div className="buttons">
                <div onClick={handleLogout} className="button is-dark">Log out</div>
              </div>
            </div>
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar