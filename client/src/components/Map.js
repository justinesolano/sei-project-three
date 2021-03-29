import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ReactMapGL, { Popup, Marker } from 'react-map-gl'

const Map = () => {
  //Getting and showing photos and data 
  const { id } = useParams()
  const [profile, setProfile] = useState(null)
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`/api/profiles/${id}`)
      setProfile(response.data)
    }
    getData()
  }, [])

  //map
  const [popup, setPopup] = useState(null)
  
  const [viewPort, setViewPort] = useState()

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(position => {
      const { longitude, latitude } = position.coords
      setViewPort({ longitude, latitude })
    })
  }, [])

  if (!profile) return null
  return (
    <>
      <div>
        <h1>{profile.username} </h1>
      </div>
      <div className="map-container">
        {viewPort ?
          <ReactMapGL
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
            height="100vh"
            width="100vh"
            mapStyle="mapbox://styles/mapbox/streets-v11"
            zoom={10}
            {...viewPort}
            onViewportChange={(viewPort) => setViewPort(viewPort)}
          >
            {profile.photos.map(photo => {
              return <Marker 
                key={photo._id} 
                longitude={photo.location.longitude} 
                latitude={photo.location.latitude}>
                <span onClick={() => setPopup(photo)}>
                  <img src={photo.image} className="image is-64x64"/>
                </span>
              </Marker>
            })}
            {popup &&
        <Popup
          latitude={popup.location.latitude}
          longitude={popup.location.longitude}
          closeOnClick={true}
          onClose={() => setPopup(null)}
        >
          <div>{popup.title}</div>
          <img key={popup._id} className="photo-userprofile" src={popup.image} alt={popup.title} />
        </Popup>
            }
          </ReactMapGL>
          :
          <h1>Loading your location…</h1>
        }
      </div>
    </>
  )
}
export default Map
