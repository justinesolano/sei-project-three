import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import DestinationCard from './DestinationCard'


const ExploreDestination = ( { photos, _id } ) => {

  const [userPhotos, setUserPhotos] = useState(null)
  const [isShown, setIsShown] = useState(false)

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('api/profiles')
      setUserPhotos(data)
    }
    getData()
  }, [])

  console.log('USER PHOTOS', userPhotos)

  return (
    <div className="container">
      <button
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        { userPhotos &&
        <div className="image-explore">
          { userPhotos.map(users => (
            <div key={users._id} { ...users } >
              <div className="gallery">
                {photos.map(photo => (
                  <div key={photo.username} className="card-content">
                    <div key={photo.id} className="card-image">
                      <div className="image-card">
                        <img src={photo.image} alt={`${_id}`} />
                      </div>
                    </div>
                    {isShown && (
                      <div className="gallery-item-info">
                        <ul>
                          <li className="gallery-item-likes"><span className="visually-hidden">Likes:</span><i className="fas fa-heart" aria-hidden="true"></i> 56</li>
                          <li className="gallery-item-comments"><span className="visually-hidden">Comments:</span><i className="fas fa-comment" aria-hidden="true"></i> 2</li>
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        }
      </button>
    </div>
  )
}

export default ExploreDestination


// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// // import { Link } from 'react-router-dom'
// import DestinationCard from './DestinationCard'
// // import { useParams } from 'react-router-dom'

// const ExploreDestination = () => {

//   // const params = useParams()
//   const [userPhotos, setUserPhotos] = useState(null)
//   // // const [exploreProfile, setExploreProfile] = useState(null)
//   // const [exploreHero, setExploreHero] = useState(0)
//   // const [explorePhotoArray, setExplorePhotoArray] = useState(0)

//   useEffect(() => {
//     const getData = async () => {
//       const { data } = await axios.get('api/profiles')
//       setUserPhotos(data)
//       // setExploreHero(parseFloat(Math.floor(Math.random() * data[0].length)))
//     }
//     getData()
//   }, [])

//   const handleUserPhotos = () => {
//     for (let i = 0; i < userPhotos.photos.length; i++){
//       return userPhotos[i].image
//     }
//   }

//   // useEffect(() => {
//   //   const getPhotosArray = async () => {
//   //     const { id } = await 
//   //   }
//   // })

//   // console.log('USER DESTINATIONS', userPhotos)
//   // console.log('USER PHOTOS', userPhotos)
//   // console.log('HERO', exploreHero)
//   // console.log('PHOTOS', explorePhotoArray)


//   // if (!userPhotos) return null

//   return (
//     <div className="section">
//       <div className="container">
//         { userPhotos &&
//       <div className="columns is-multiline">
//         { userPhotos.map( users => (
//           <DestinationCard key={users._id} {...handleUserPhotos} />
//         ))}
//         {/* { userPhotos.map( users => (
//           return users.photos
//         ))

//         } */}


//       </div>
//         }
//       </div>
//     </div>

//   //   <div classNameName="hero">
//   //     <img src={userPhotos[exploreHero].image} 
//   //       style={{
//   //         'width': '100vw',
//   //         'max-height': '50vh'
//   //       }}/>
//   //   </div>
//   //   <div classNameName="section">
//   //     <div classNameName="container">
//   //       { userPhotos &&
//   //       <div classNameName="columns is-multiline">
//   //         { userPhotos.map( destinations => (
//   //           <DestinationCard key={destinations._id} {...destinations} />
//   //         ))}
//   //       </div>
//   //       }
//   //     </div>
//   //   </div>
//   // </>
//   )
// }

// export default ExploreDestination


// // not the same as in the database - the ones people upload
// // feed in a few videos
// // 

// // router.route('/profiles/:id/photos')
// //   .post(secureRoute, addPhotoToProfile)

// // router.route('/profiles/:id/photos/:photoId')
// //   .post(secureRoute, addCommentToPhoto)
// //   .delete(secureRoute, deletePhotoFromProfile)