import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'

const UserProfile = () => {
  const [viewPort, setViewPort] = useState({
    latitude: 51.515,
    longitude: -0.078,
    zoom: 4
  })
  console.log(viewPort, setViewPort)
  const [popup, setPopup] = useState(null)
  console.log('popup', popup, setPopup)
  const { id } = useParams()
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`/api/profiles/${id}`)
      setProfile(response.data)
    }
    getData()
  }, [])

  // useEffect(() => {
  //   window.navigator.geolocation.getCurrentPosition(position => {
  //     const { longitude, latitude } = position.coords
  //     console.log('coordss >>', longitude, latitude)
  //     setViewPort({ longitude, latitude })

  //   })
  // }, [])



  if (!profile) return null
  return (
    <>
      <div>
        <h1>{profile.username} </h1>
      </div>
      <div className='map-container'>
        {viewPort ?
          <ReactMapGL
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
            height='100%'
            width='100%'
            mapStyle='mapbox://styles/mapbox/streets-v11'
            {...viewPort}
            onViewportChange={(viewPort) => setViewPort(viewPort)}
          >
            {profile.photos.map(photo => {
              return <Marker key={photo._id} longitude={photo.location.longitude} latitude={photo.location.latitude}>
                {/* <span onClick={() => setPopup(location)}> */}
                {photo.location.icon}
                {/* </span> */}
              </Marker>
            })}

          </ReactMapGL>
          :
          <h1>Loading your location...</h1>
        }
      </div>
      {profile.photos.map(photo => (
        <div key={photo.title}>
          <h3>{photo.title} </h3>
          <img key={photo.id} className='photo-userprofile' src={photo.image} alt={photo.title} />
        </div>
      ))}
      {popup &&
        <Popup
          latitude={popup.latitude}
          longitude={popup.longitude}
          closeOnClick={true}
          onClose={() => setPopup(null)}
        >
          <div>{popup.title}</div>
          <img key={popup._id} className='photo-userprofile' src={popup.image} alt={popup.title} />
        </Popup> 
      }
    </>
  )
}

export default UserProfile
