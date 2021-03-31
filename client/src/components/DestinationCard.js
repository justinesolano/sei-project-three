// import axios from 'axios'
import React from 'react'
import { Link, useParams } from 'react-router-dom'

const DestinationCard = ( { photos, _id, username }) => {

  const { destination } = useParams()
  
  // console.log('PARAMS', destination)
  console.log('PHOTOS', photos[0].locationName)
  // console.log('DESTINATION', destination === photos[0].locationName)

  return (
    <div
      className="tile is-parent is-vertical is-3 is-gapless"
      key={_id}
    >
      {photos.map((photo) => {
        if (photo.locationName === destination){
          return (
            <>
              <div
                className="tile is-child notification"
                key={photo.id}>
                <Link to={`/profile/${_id}`}>
                  <div
                    key={username._id}
                    title={`${username}`}
                    className="has-tooltip-bottom"
                    data-tooltip=
                      {`
                      ${photo.title} ${photo.location.icon} by ${username} 📍 ${photo.locationName}`}>
                    <img src={photo.image} alt={`${username._id}`} className="feed-image " />
                  </div>
                </Link>
              </div>
            </>
          )
        } 
        if (destination === 'all'){
          return (
            <>
              <div
                className="tile is-child notification"
                key={photo.id}>
                <Link to={`/profile/${_id}`}>
                  <div
                    key={username._id}
                    title={`${username}`}
                    className="has-tooltip-bottom"
                    data-tooltip=
                      {`
                    ${photo.title} ${photo.location.icon} by ${username} 📍 ${photo.locationName}`}>
                    <img src={photo.image} alt={`${username._id}`} className="feed-image " />
                  </div>
                </Link>
              </div>
            </>
          )
        }
      })}
    </div>
  )
}

export default DestinationCard