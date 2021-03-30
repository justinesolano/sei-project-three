import React from 'react'
import { Link } from 'react-router-dom'

const DestinationCard = ( { photos, _id, username }) => {

  return (
    <div
      className="tile is-parent is-vertical is-3 is-gapless"
      key={_id}
      // onMouseEnter={() => setIsShown(true)}
      // onMouseLeave={() => setIsShown(false)}
    >
      {photos.map((photo) => {
        return (
          <>
            <div
              className="tile is-child notification"
              key={photo.id}>
              <Link to={`/userprofile/${_id}`}>
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
      })}
    </div>
  )
}

export default DestinationCard