/* eslint-disable no-unused-vars */
import React from 'react' 
import axios from 'axios'

const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET

export const ImageUploadField = ({ handleImageUrl, value }) => {
  
  const handleUpload = async event => {
    const data = new FormData()
    data.append('file', event.target.files[0])
    data.append('upload_preset', uploadPreset)
    const res = await axios.post(uploadUrl, data)
    handleImageUrl(res.data.url)
  }



  return (
    <>
      {value ?
        <div>
          <img src={value} alt="tiger"/>
        </div>
        :
        <>
          <label>Image to Upload</label>
          <input
            className="input"
            type="file"
            onChange={handleUpload}
          />
        </>
      }
    </>
  )
}