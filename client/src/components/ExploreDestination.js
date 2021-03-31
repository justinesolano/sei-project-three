import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import photoFeed from '../assets/photofeed.png'
import DestinationCard from './DestinationCard'

const ExploreDestination = () => {

  const [userPhotos, setUserPhotos] = useState(null)

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
      <Link to={'/feed'} className="feed-title">
        <img src={photoFeed} className="photo-feed-title"/>
      </Link>
      <div className="ui explore-destination-grid tile is-ancestor is-gapless"
      >
        {userPhotos.map((users) => {
          return (
            <DestinationCard key={users.id} {...users} />
          )
        })}
      </div>
    </>
  )
}

export default ExploreDestination

