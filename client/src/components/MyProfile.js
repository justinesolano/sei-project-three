import React/*, { useEffect, useState }*/ from 'react'
// import { useParams } from 'react-router's
// import { useParams } from 'react-router-dom'
// import axios from 'axios'
// import { Link } from 'react-router-dom'
// import AddPictureToProfile from './AddPictureToProfile'
import { userIsAuthenticated } from '../helpers/auth'

const MyProfile = () => {

  // const params = useParams()

  const myProfile = () => {
    if (userIsAuthenticated){
      console.log('Passport is valid!')
    } else return null
  }

  return (
    <div>
      { myProfile() &&
      <>
        <div className="my-profile-parent">
          <h1 className="my-profile-title">My Profile</h1>
          <h1 className="username">Username: </h1>
          <h1 className="my-profile">My Profile</h1>
          <h1 className="my-profile">My Profile</h1>
          <h1 className="my-profile">My Profile</h1>
        </div>
      </>
      }
      { !myProfile() &&
      <div>

      </div>
      }
    </div>
  )
}

export default MyProfile


// const { id } = useParams()

// const [myProfile, setMyProfile] = useState('')


// const handleMyProfile = async event => {
//   setMyProfile(event.target.name)
//   console.log('>>>', myProfile, event.target)
//   const token = window.localStorage.getItem('token')
//   console.log('TOKEN',token)
//   {
//     // headers: {
//     //   Authorization: `Bearer ${token}`
//     // }
//   }
// }

// console.log(handleMyProfile)

// const [username, setUsername] = useState(null)

// useEffect(() => {
//   const getData = async () => {
//     const { data } = await axios.get('/api/profiles')
//     setUsername(data)
//     // setHero(parseFloat(Math.floor(Math.random() * data.length)))
//   }
//   getData()
// }, [])
// console.log('USERNAME', username)




// const userMap = () => {
//   username.map((user) => {
//     return (
//       user.username
//     )
//   })
// }
// userMap()

