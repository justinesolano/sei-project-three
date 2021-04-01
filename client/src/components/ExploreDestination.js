import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import explore from '../assets/explore.png'
import DestinationCard from './DestinationCard'
import Destination from './Destination'

const ExploreDestination = () => {

  const [userPhotos, setUserPhotos] = useState(null)
  // const params = useParams()


  useEffect(() => {
    const getTheData = async () => {
      const { data } = await axios.get('/api/profiles')
      setUserPhotos(data)
    }
    getTheData()
  }, [])

  if (!userPhotos) return null
  
  return (
    <>
      <Link to={'/explore/destinations'} className="feed-title">
        <img src={explore} className="photo-feed-title"/>
      </Link>
      <div className="ui explore-destination-grid tile is-ancestor is-gapless"
      >
        {userPhotos.map((users) => {
          return (
            <DestinationCard key={users.id} {...users} />
          )
        })}
      </div>
      <div className="ui explore-destination-grid tile is-ancestor is-gapless"
      >
        <Destination key={userPhotos.id}/>
      </div>
    </>
  )
}

export default ExploreDestination

