import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ReactMapGL, { Popup, Marker } from 'react-map-gl'
import { Button, Icon, Label } from 'semantic-ui-react'
const UserProfile = () => {
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
  //closing opening comments 
  const [viewComments, setViewComments] = useState('')
  const handleChange = event => {
    setViewComments(event.target.name)
  }
  //map
  const [popup, setPopup] = useState(null)
  const [viewPort, setViewPort] = useState()
  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(position => {
      console.log('POSITION', position)
      const { longitude, latitude } = position.coords
      setViewPort({ longitude, latitude })
    })
  }, [])
  console.log('POPUP', popup)
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
            height='100vh'
            width='100vh'
            mapStyle='mapbox://styles/mapbox/streets-v11'
            {...viewPort}
            onViewportChange={(viewPort) => setViewPort(viewPort)}
          >
            {profile.photos.map(photo => {
              return <Marker key={photo._id} longitude={photo.location.longitude} latitude={photo.location.latitude}>
                <span onClick={() => setPopup(photo)}>
                  {photo.location.icon}
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
          <img key={popup._id} className='photo-userprofile' src={popup.image} alt={popup.title} />
        </Popup>
            }
          </ReactMapGL>
          :
          <h1>Loading your location...</h1>
        }
      </div>
      {profile.photos.map(photo => (
        <div key={photo._id}>
          <h3>{photo.title} </h3>
          <img key={photo._id} className='photo-userprofile' src={photo.image} alt={photo.title} />
          <Button as='div' labelPosition='right'>
            <Button icon>
              <Icon name='heart' />
        Like
            </Button>
            <Label as='a' basic pointing='left'>
              {photo.likes.length}
            </Label>
          </Button>
          <div>
            <Button
              onClick={handleChange}
              name={`${photo._id}`}
              key={photo._id}>
              View comments</Button>
            {photo.comments.map(comment => {
              return <>
                {!viewComments &&
                  <p key={comment._id}>
                    {comment.text}
                  </p>}
              </>
            })}
          </div>
        </div>
      ))}
    </>
  )
}
export default UserProfile