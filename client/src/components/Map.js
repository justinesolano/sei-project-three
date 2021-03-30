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
<<<<<<< HEAD
      } */} 

        // const [likePhoto, setLikePhoto] = useState('')
  const [FormData, setFormdata] = useState({
    like: true
  })
  console.log(setFormdata)
  const [toggleForLike, setToggleForLike] = useState(false)
  const handleLike = async event => {
    if (toggleForLike === false) {
      console.log('POST ME', event.target.name)
      const token = window.localStorage.getItem('token')
      // setLikePhoto(event.target.name)
      const setData = await axios.post(`/api/profiles/${id}/photos/6062044671b2ed3c86db142a/likes`, FormData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      console.log(setData)
      console.log('im senind DSATAAA')
      setToggleForLike(true)
      console.log(toggleForLike)
    } else {
      console.log('DELETE ME', event.target.name)
      // const token = window.localStorage.getItem('token')
      const getLikesFromApi = await axios.get(`/api/profiles/${id}`)
      // const photoToMapLikes = getLikesFromApi.data.photos[event.target.value]
      console.log('>>>>>', getLikesFromApi)
      // setLikePhoto(event.target.name)

      // await axios.delete(`/api/profiles/${id}/photos/${likePhoto}/likes/`, FormData,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`
      //     }
      //   })
      setToggleForLike(false)
    }

  }


=======
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
>>>>>>> development
