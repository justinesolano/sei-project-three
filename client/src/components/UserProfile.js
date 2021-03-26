import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ReactMapGL from 'react-map-gl'

const UserProfile = () => {


  console.log('my token ', process.env.REACT_APP_MAPBOX_ACCESS_TOKEN)
  const { id } = useParams()
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`/api/profiles/${id}`)
      setProfile(response.data)
    }
    getData()
  }, [])



  if (!profile) return null
  return (
    <>
      {/* <div>
        <h1>{profile.username} </h1>
      </div> */}
      <div className='map-container'>
        <ReactMapGL
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          height='50%'
          width='50%'
          mapStyle='mapbox://styles/mapbox/streets-v11'
          latitude={51.515}
          longitude={-0.078}
          zoom={10}
        >

        </ReactMapGL>
      </div>
      {/* {profile.photos.map(photo => (
        <div key={photo.title}>
          <h3>{photo.title} </h3>
          <img key={photo.id} className='photo-userprofile' src={photo.image} alt={photo.title} />
        </div>
      ))} */}
    </>
  )
}

export default UserProfile
