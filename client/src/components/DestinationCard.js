import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const DestinationCard = ({ photos, _id }) => {

  const [isShown, setIsShown] = useState(false)



  return (
    <div className="explore-card-parent">
      <button
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        <Link to={`/profiles/${_id}`}>
          {/* <div className=""> */}
          {/* <div className="card-header">
              <div className="card-header-title"></div>
            </div> */}
          
          {photos.map(photo => (
            <div key={photo.id} className="card-image">
              <div className="image-card">
                <img src={photo.image} alt={`${_id}`} />
              </div>
            </div>
          ))}
          <div className="card-content">
            {isShown && (
              <div className="gallery-item-info">
                <ul>
                  {/* <li className="gallery-item-likes"><span className="visually-hidden">Likes:</span><i className="fas fa-heart" aria-hidden="true"></i> </li>
                  <li className="gallery-item-comments"><span className="visually-hidden">Comments:</span><i className="fas fa-comment" aria-hidden="true"></i> {photo.comments}</li> */}
                </ul>
              </div>
            )}
          </div>
          {/* </div> */}
        </Link>
      </button>
    </div>
  )
}

export default DestinationCard