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
  const [viewComments, setViewComments] = useState(true)

  const handleChange = event => {
    console.log(event.target.value)
    if (viewComments === true) {
      setViewComments(false)
    } else {
      setViewComments(true)
    }

  }
  //map
  const [popup, setPopup] = useState(null)
  const [viewPort, setViewPort] = useState(null)

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
              value={viewComments}
              name={photo._id}
              key={photo.index}>
              View comments</Button>
            {photo.comments.map(comment => (
              <>
                {!viewComments &&
                  <p key={comment._id}>
                    {comment.text}
                  </p>}

              </>

            ))}
          </div>
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
