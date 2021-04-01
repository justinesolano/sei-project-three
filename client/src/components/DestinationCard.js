import React from 'react'
import { Link, useParams } from 'react-router-dom'

const DestinationCard = ( { photos, _id, username }) => {

  const { destination } = useParams()

  return (
    <div
      className="tile is-parent is-vertical is-3 is-gapless"
      key={_id}
    >
      {photos.map((photo, index) => {
        if (photo.locationName === destination){
          return (
            <div
              className="tile is-child notification"
              key={index}>
              <Link to={`/profile/${_id}`}>
                <div
                  title={`${username}`}
                  className="has-tooltip-bottom"
                  data-tooltip=
                    {`
                      ${photo.title} ${photo.location.icon} by ${username} 📍 ${photo.locationName}`}>
                  <img src={photo.image} alt={`${username._id}`} className="feed-image " />
                </div>
              </Link>
            </div>
          )
        } 
        if (destination === 'alldestinations'){
          return (
            <div
              className="tile is-child notification"
              key={index}>
              <Link to={`/profile/${_id}`}>
                <div
                  title={`${username}`}
                  className="has-tooltip-bottom"
                  data-tooltip=
                    {`
                    ${photo.title} ${photo.location.icon} by ${username} 📍 ${photo.locationName}`}>
                  <img src={photo.image} alt={`${username._id}`} className="feed-image " />
                </div>
              </Link>
            </div>
          )
        }
      })}
    </div>
  )
}

export default DestinationCard