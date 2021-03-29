import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import DestinationCard from './DestinationCard'
// import { Grid, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import photoFeed from '../assets/photofeed.png'

const ExploreDestination = () => {

  const [userPhotos, setUserPhotos] = useState(null)
  // const [hero, setHero] = useState(null)
  // const [isShown, setIsShown] = useState(false)

  useEffect(() => {
    const getTheData = async () => {
      const { data } = await axios.get('/api/profiles')
      setUserPhotos(data)
      // setHero(parseFloat(Math.floor(Math.random() * data.length)))
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
      <div tile is-ancestor className="ui explore-destination-grid"
        // onMouseEnter={() => setIsShown(true)}
        // onMouseLeave={() => setIsShown(false)}
      >
        {userPhotos.map((users) => {
          return (
            <div className="tile is-parent is-vertical is-3" key={users._id}>
              {users.photos.map((photo) => {
                return (
                  <>
                    <div
                      className="tile is-child notification"
                      key={photo.id}>
                      <Link to={`/userprofile/${users._id}`}>
                        <img src={photo.image} alt={`${users._id}`}/>
                        {/* {isShown && (
                          <h2 className="username-hovered">{users.username}</h2>
                        )} */}
                      </Link>
                    </div>
                  </>
                )
              })}
            </div>
          )
        })}
      </div>
    </>
  )

  //   <div className="tile explore-hero is full">
  //   <img src={hero.} />
  // </div>

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

