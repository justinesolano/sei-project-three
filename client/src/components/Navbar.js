import React, { useState } from 'react'
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
    <div>
      <div className="control">
        <Select
          options={groupedOptions}
          isMulti
          name="search"
          onChange={(selected) => handleMultiChange(selected, 'search')}
        />
      </div>
    </div>
  )
}

export default Navbar