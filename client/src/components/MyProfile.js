import React from 'react'
// import { useParams } from 'react-router-dom'
// import axios from 'axios'
// import { Link } from 'react-router-dom'
// import AddPictureToProfile from './AddPictureToProfile'

const MyProfile = () => {

  // const { id } = useParams()

  // const [myProfile, setMyProfile] = useState('')


  // const handleMyProfile = async event => {
  //   setMyProfile(event.target.name)
  //   console.log('>>>', myProfile, event.target)
  //   const token = window.localStorage.getItem('token')
  //   await axios.post(`/api/profiles/${id}`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     })
  // }


  return (
    <div>
      <h1>My Profile</h1>    
      <h2>username</h2>
      <h3>posts</h3>
    </div>
  )
}

export default MyProfile
