import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'
// import DestinationCard from './DestinationCard'

const ExploreDestination = () => {

  const [userDestinations, setUserDestinations] = useState(null)
  // const [exploreProfile, setExploreProfile] = useState(null)
  const [exploreHero, setExploreHero] = useState(0)

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/profiles/:id/photos')
      setUserDestinations(data)
      setExploreHero(parseFloat(Math.floor(Math.random() * data.length)))
      console.log('DATA', data)

    }
    getData
  }, [])

  console.log('USER DESTINATIONS', userDestinations)
  console.log('EXPLORE HERO', exploreHero)

  // useEffect(() => {
  //   const getData = async () => {
  //     const { data } = await axios.get('/api/profiles')
  //     setExploreProfile(data)
  //   }
  //   getData()
  // }, [])

  // // const handleUserPhotos = () => {
  // //   for (let i = 0; i < exploreProfile.length; i++) {
  // //     return exploreProfile[i].username
  // //   }
  // // }

  // if (!exploreProfile) return null

  return (
    <>
    </>
    // <>
    //   <div className="hero">
    //     <img src={userDestinations[exploreHero].image} 
    //       style={{
    //         'width': '100vw',
    //         'max-height': '50vh'
    //       }}/>
    //   </div>
    //   <div className="section">
    //     <div className="container">
    //       { userDestinations &&
    //       <div className="columns is-multiline">
    //         { userDestinations.map( destinations => (
    //           <DestinationCard key={destinations._id} {...destinations} />
    //         ))}
    //       </div>
    //       }
    //     </div>
    //   </div>
    // </>
  )
}

export default ExploreDestination


// not the same as in the database - the ones people upload
// feed in a few videos
// 

// router.route('/profiles/:id/photos')
//   .post(secureRoute, addPhotoToProfile)

// router.route('/profiles/:id/photos/:photoId')
//   .post(secureRoute, addCommentToPhoto)
//   .delete(secureRoute, deletePhotoFromProfile)