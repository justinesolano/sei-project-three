import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import DestinationCard from './DestinationCard'
// import { Grid, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import photoFeed from '../assets/photofeed.png'
import DestinationCard from './DestinationCard'

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
      <div className="ui explore-destination-grid tile is-ancestor is-gapless"
        // onMouseEnter={() => setIsShown(true)}
        // onMouseLeave={() => setIsShown(false)}
      >
        {userPhotos.map((users) => {
          return (
            <DestinationCard key={users.id} {...users} />
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

