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
    <nav className="ui menu" style={{ width: '100vw' }}>
      <div className="nav-container">
        <section className="left-nav">
          <div className="jetflix-nav-logo">
            <Link to="/home" className="logo-to-home">
              <img src={jetflixLogo}></img>
            </Link>
          </div>
          <div className="my-list">
            <Link to="/home" className="my-list-link">
              <a className="nav-links">My List</a>
            </Link>
          </div>
          <div className="explore">
            <Link to="/profiles" className="explore-link">
              <a className="nav-links">Explore</a>
            </Link>
          </div>
        </section>
        <section className="right-nav">
          <div className="control">
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
        </section>
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

