// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'

// const DestinationCard = ({ photos, _id, username }) => {

//   const [isShown, setIsShown] = useState(false)

//   return (
//     <div className="explore-card-parent">
//       <button
//         onMouseEnter={() => setIsShown(true)}
//         onMouseLeave={() => setIsShown(false)}
//       >
//         <Link to={`/profiles/${_id}`}>
//           <div className="columns">
//             {photos.map(photo => (
//               <div key={photo.id} className="card-image">
//                 <div className="image-card">
//                   <img src={photo.image} alt={`${_id}`} />
//                 </div>
//               </div>
//             ))}
//             <div className="card-content">
//               {isShown && (
//                 <div className="hover-info">
//                   {username}
//                 </div>
//               )}
//             </div>
//           </div>
//         </Link>
//       </button>
//     </div>
//   )
// }

// export default DestinationCard