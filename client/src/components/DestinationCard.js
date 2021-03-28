import React from 'react'
import { Link } from 'react-router-dom'

const DestinationCard = ({ image, _id, username }) => {
  return (
    <div className="column is-one-quarter-desktop is-one-third-tablet">
      <Link to={`/profiles/${_id}`}>
        <div className="card">
          <div className="card-header">
            <div className="card-header-title">{username}</div>
          </div>
          <div className="card-image">
            <figure className="image image-is-1by1">
              <img src={image} alt={`${_id}`} />
            </figure>
          </div>
          <div className="card-content">
          </div>
        </div>
      </Link>
    </div>
  )
}

export default DestinationCard