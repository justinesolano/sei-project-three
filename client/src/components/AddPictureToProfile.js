import React, { useState } from 'react'
import { ImageUploadField } from '../components/ImageUploadField'
import Select from 'react-select'

const locationOptions = [
  { longitude: -0.136420, latitude: 50.819520, location: 'London', label: 'London' },
  { longitude: -2.136420, latitude: 1.819520, location: 'Antartiica', label: 'Antartica' },
  { longitude: -1.136420, latitude: 2.819520, location: 'Spain', label: 'Spain' }
]
const AddPictureToProfile = () => {

  const [formdata, setFormdata] = useState({
    title: '',
    icon: '',
    location: [],
    photoImage: ''
  })


  const handleChange = event => {
    console.log(event.target.value)
    setFormdata(event.target.value)
  }

  const handleSubmit = event => {
    console.log(event.value)
  }

  const handleMultiChange = (selected, name) => {
    const values = selected ? selected.map(item => { 
      item
    }
    ) : []
    setFormdata({ ...formdata, [name]: [...values] })
    console.log(formdata)
  }

  const handleImageUrl = url => {
    setFormdata({ ...formdata, photoImage: url })
  }

  return (
    <main className="section">
      <div className="columns is-mobile">
        <div className="column is-6-tablet is-offset-3-tablet is-8-mobile is-offset-2-mobile box">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Title</label>
              <div className="control">
                <input
                  className="input"
                  name="title"
                  value={formdata.title}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Icon</label>
              <div className="control">
                <input
                  className="input"
                  name="icon"
                  value={formdata.icon}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Location</label>
              <div className="control">
                <Select
                  options={locationOptions}
                  isMulti
                  name="location"
                  onChange={(selected) => handleMultiChange(selected, 'location')}
                />
              </div>
            </div>
            <ImageUploadField
              value={formdata.photoImage}
              name="photoImage"
              handleImageUrl={handleImageUrl}
            />
            <div className="field">
              <button className="button is-fullwidth is-dark" type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

export default AddPictureToProfile
