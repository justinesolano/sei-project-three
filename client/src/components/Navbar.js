import React, { useState, useEffect } from ‘react’
import { Link } from ‘react-router-dom’
import jetflixLogo from ‘../assets/jetflixlogo.png’
import Select from ‘react-select’
import { continentOptions, suitableOptions, tagOptions } from ‘./data/searchData’

const groupedOptions = [
  { label: ‘Continents’, options: continentOptions },
  { label: ‘Suitable For’, options: suitableOptions },
  { label: ‘Tags’, options: tagOptions }
]

const Navbar = () => {

  const [formdata, setFormdata] = useState({
    search: []
  })

  const handleMultiChange = (selected, name) => {
    const values = selected ? selected.map(item => item.value) : []
    setFormdata({ …formdata, [name]: […values] })
  }

  const [show, handleShow] = useState(false)

  useEffect(() => {
    window.addEventListener(‘scroll’, () => {
      if (window.scrollY > 10) {
        handleShow(true)
      } else handleShow(false)
    })
    return () => {
      window.removeEventListener(‘scroll’, window)
    }
  }, [])

  return (
    <nav className={`navbar topnav ${show && 'nav__black'}`} >
      <div className=“logo-and-main-nav”>
        <div className=“jetflix-nav-logo”>
          <Link to=“/“ className=“logo-to-home”>
            <img src={jetflixLogo} className=“jetflix”></img>
          </Link>
        </div>
        <ul className=“navbar-link-list”>
          <section className=“left-nav”>
            <li>
              <Link to=“/home” className=“home-link-div”>
                <a className=“nav-links home-link”>Home</a>
              </Link>
            </li>
            <li>
              <Link to=“/home” className=“my-list-link-div”>
                <a className=“nav-links my-list-link”>My List</a>
              </Link>
            </li>
            <li>
              <Link to=“/explore” className=“explore-link-div”>
                <a className=“nav-links explore-link”>Explore</a>
              </Link>
            </li>
          </section>
        </ul>
      </div>
      <div className=“navbar-link-list-two”>
        <section className=“right-nav”>
          <Select className=“search-bar-link”
            options={groupedOptions}
            isMulti
            name=“search”
            placeholder=“Find your paradise here”
            onChange={(selected) => handleMultiChange(selected, ‘search’)}
          />
        </section>
        <div className=“end-nav”>
          <section>
            <Link to=“/profiles” className=“profiles-link-div”>
              <a className=“nav-links profiles-link”>Profiles</a>
            </Link>
          </section>
        </div>
      </div>
    </nav>
  )    
}

// home
// my list
// explore - link to explore page into div

// div
// search
// profile - image 

export default Navbar




