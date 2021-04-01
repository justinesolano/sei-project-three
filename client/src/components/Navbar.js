import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import jetflixLogo from '../assets/jetflixlogo.png'
import Select from 'react-select'
import { suitableOptions, tagOptions, continentOptions } from './data/searchData'
import { userIsAuthenticated, getPayloadFromToken } from '../helpers/auth'
import { useHistory, useLocation } from 'react-router-dom'

const groupedOptions = [
  { label: 'Suitable For', options: suitableOptions },
  { label: 'Tags', options: tagOptions },
  { label: 'Continents', options: continentOptions }
]

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? 'grey' : 'darkgrey'
  })
}

const Navbar = ({ searchData, setSearchData }) => {

  const handleSearchChange = (selected, name) => {
    const values = selected ? selected.map(item => item.value) : []
    setSearchData({ ...searchData, [name]: [...values] })
  }

  const location = useLocation()
  
  useEffect(() => {
  }, [location.pathname])

  const history = useHistory()

  const [show, handleShow] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 1) {
        handleShow('is-transparent')
      } else handleShow('is-black')
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

  const profileId = getPayloadFromToken().sub

  return (
    <nav className={`navbar is-fixed-top is-black is-transparent ${show && 'is-black'}`} role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        { userIsAuthenticated() &&
         <Link to="/home" className="navbar-item" >
           <img src={jetflixLogo} className="jetflix" />
         </Link>
        }
        { !userIsAuthenticated() &&  
         <Link to="/" className="navbar-item" >
           <img src={jetflixLogo} className="jetflix" />
         </Link>
        }
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
              <Link to="/explore/destinations" className="navbar-item">
                  Explore
              </Link>
              <Link to="/feed" className="navbar-item">
                  Feed
              </Link>
            </>
              }
              { userIsAuthenticated() &&
              <>
                <Link to={`/profile/${profileId}`} className="navbar-item" >
              My Profile
                </Link>
                <Link to="/explore/destinations" className="navbar-item">
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
          {window.location.pathname === '/home' &&
          <div className="navbar-item">
            <Select className="search-bar-link"
              options={groupedOptions}
              styles={customStyles}
              isMulti
              name="search"
              placeholder="Find your paradise here"
              onChange={(selected) => handleSearchChange(selected, 'search')}
            />
          </div>
          }
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