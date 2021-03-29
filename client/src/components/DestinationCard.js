import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const DestinationCard = ({ photos, _id, username, location }) => {

  const [isShown, setIsShown] = useState(false)



  return (
    <div className="column is-one-quarter-desktop is-one-third-tablet">
      <button
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        <Link to={`/profiles/${_id}`}>
          <div className="card">
            <div className="card-header">
              <div className="card-header-title">{username}</div>
            </div>
            {photos.map(photo => (
              <div key={photo.id} className="card-image">
                <figure className="image image-is-1by1">
                  <img src={photo.image} alt={`${_id}`} />
                </figure>
              </div>
            ))}
            <div className="card-content">
              {isShown && (
                <div>
                  {username}
                  {location}
                </div>
              )}
            </div>
          </div>
        </Link>
      </button>
    </div>
  )
}

export default DestinationCard