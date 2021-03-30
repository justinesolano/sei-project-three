import React from 'react'
import { Link } from 'react-router-dom'

const DestinationCard = ( { photos, _id, username }) => {

  // const [isShown, setIsShown] = useState(false)

  // const [state, setState] = useState(null)

  // const state = {
  //   placements: [
  //     'up',
  //     'down',
  //     'left',
  //     'right',
  //     'up-left',
  //     'up-right',
  //     'down-left',
  //     'down-right'
  //   ]
  // }


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
                  data-tooltip=
                    {`
                    ${photo.title} ${photo.location.icon} by ${username} 📍 ${photo.locationName}`}
                  tooltip
                  has-tooltip-top
                  has-tooltip-success
                  is-tooltip-multiline>
                  <img src={photo.image} alt={`${username._id}`} />
                </div>
              </Link>
            </div>
          </>
        )
      })}
    </div>





  // <div className="explore-card-parent">
  //   <button
  //     onMouseEnter={() => setIsShown(true)}
  //     onMouseLeave={() => setIsShown(false)}
  //   >
  //     <Link to={`/profiles/${_id}`}>
  //       <div className="columns">
  //         {photos.map(photo => (
  //           <div key={photo.id} className="card-image">
  //             <div className="image-card">
  //               <img src={photo.image} alt={`${_id}`} />
  //             </div>
  //           </div>
  //         ))}
  //         <div className="card-content">
  //           {isShown && (
  //             <div className="hover-info">
  //               {username}
  //             </div>
  //           )}
  //         </div>
  //       </div>
  //     </Link>
  //   </button>
  // </div>
  )
}

export default DestinationCard