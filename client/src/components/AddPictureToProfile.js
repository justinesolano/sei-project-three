import axios from 'axios'
import React, { useState } from 'react'
import { ImageUploadField } from '../components/ImageUploadField'
import { getPayloadFromToken } from '../helpers/auth'
import { Header } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'

const AddPictureToProfile = () => {

  const [formdata, setFormdata] = useState({
    title: '',
    icon: '',
    locationName: '',
    image: ''
  })

  const history = useHistory()

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setFormdata({ ...formdata, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const profileId = getPayloadFromToken().sub
    try {
      await axios.post(`/api/profiles/${profileId}/photos`, formdata, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('token')}`
        }
      })
    } catch (err) {
      console.log(err)
    }
    history.push(`/profile/${profileId}`)
  }

  const handleImageUrl = url => {
    setFormdata({ ...formdata, image: url })
  }

  return (
    <main className="picture-page section">
      <div className="container">
        <div className="columns">
          <form className="picture-content box column is-half is-offset-one-quarter" onSubmit={handleSubmit}>
            <Header className="header" as="h2" textAlign="left" >
              Post a picture
            </Header><div className="field">
              <label>Title</label>
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
              <label>Icon</label>
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
              <label>Location</label>
              <div className="control">
                <input
                  className="input"
                  name="locationName"
                  value={formdata.locationName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <ImageUploadField
              value={formdata.image}
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