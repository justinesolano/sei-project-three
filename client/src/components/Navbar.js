import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import jetflixLogo from '../assets/jetflixlogo.png'
import Select from 'react-select'
import { continentOptions, suitableOptions, tagOptions } from './data/searchData'

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

  return (
    <nav className="ui menu navbar" >
      <div className="nav-container navbar-brand">
        <div className="left-nav">
          <div className="jetflix-nav-logo">
            <Link to="/home" className="logo-to-home">
              <img src={jetflixLogo}></img>
            </Link>
          </div>
          <div className="my-list navbar-item">
            <Link to="/home" className="my-list-link">
              <a className="nav-links">My List</a>
            </Link>
          </div>
          <div className="explore  navbar-item">
            <Link to="/profiles" className="explore-link">
              <a className="nav-links">Explore</a>
            </Link>
          </div>
        </div>
        <div className="right-nav">
          <div className="control navbar-item">
            <Select
              options={groupedOptions}
              isMulti
              name="search"
              onChange={(selected) => handleMultiChange(selected, 'search')}
            />
          </div>
          <div className="profiles">
            <Link to="/profiles" className="profiles-link">
              <a className="nav-links">Profiles</a>
            </Link>
          </div>
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

