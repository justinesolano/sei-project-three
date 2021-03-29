import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import DestinationCard from './DestinationCard'
// import { Grid, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import photoFeed from '../assets/photofeed.png'

const ExploreDestination = () => {

  const [userPhotos, setUserPhotos] = useState(null)

  useEffect(() => {
    const getTheData = async () => {
      const { data } = await axios.get('/api/profiles')
      setUserPhotos(data)
    }
    getTheData()
  }, [])

  console.log('USER PHOTOS', userPhotos)

  if (!userPhotos) return null
  
  return (
    <>
      <Link to={'/feed'} className="feed-title">
        <img src={photoFeed} className="photo-feed-title"/>
      </Link>
      <div tile is-ancestor className="ui explore-destination-grid">
        {userPhotos.map((users) => {
          return (
            <div className="tile is-parent is-vertical" key={users._id} columns= {4}>
              {users.photos.map((photo) => {
                return (
                  <div className="tile is-child notification" key={photo.id}>
                    <Link to={`/userprofile/${users._id}`}>
                      <img src={photo.image} alt={`${users._id}`}/>
                    </Link>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </>
  )



  // return (
  //   <div className="explore-page">

  //     <div className="card-parent">
  //       { userPhotos &&
  //       <div className="column">
  //         { userPhotos.map(users => (
  //           <DestinationCard key={users._id} { ...users } />
  //         ))}
  //       </div>
  //       }
  //     </div>
  //   </div>
  // )
}

export default ExploreDestination

