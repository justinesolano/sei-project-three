import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import profilePicture from '../assets/profile.png'
import { Icon } from 'semantic-ui-react'
const UserProfile = () => {

  //Getting and showing photos and data 
  const { id } = useParams()
  const [profile, setProfile] = useState(null)
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`/api/profiles/${id}`)
      setProfile(response.data)

    }
    getData()
  }, [])


  //closing opening comments 
  // const [viewComments, setViewComments] = useState('true')
  // const [toggleComments, setToggleComments] = useState(true)
  // const handleChange = event => {
  //   if (toggleComments === true) {
  //     setToggleComments(false)
  //     console.log(event.target)
  //   }
  //   if (toggleComments === false) {
  //     setToggleComments(true)
  //   }
  // }


  // handle post a like 
  // const [likes, getLikes] = useState([])
  // const [arrayLikes, getArrayLikes] = useState([])
  // const [testLikes, getTestLikes] = useState(0)
  // console.log(getTestLikes)
  // const setArray = []
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/api/profiles/${id}`)
      console.log(data.photos)
    }
    getData()
  }, [])
  // const [FormData] = useState({
  //   like: true
  // })
  // const [eventName, setEventName] = useState('')

  // const handleLike = async event => {
  //   setEventName(event.target.name)
  //   console.log('>>>', eventName, event.target)
  //   const token = window.localStorage.getItem('token')
  //   await axios.post(`/api/profiles/${id}/photos/${event.target.name}/likes`, FormData,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     })
  // }




  if (!profile) return null


  return (
    <div className="everythingProfile">
      <div className='user-profile is-fullheight-with-navbar ' >
        <div className='columns user-profile-header'>
          <div className='user-profile-left-header'>
            <Icon name="user circle outline" size="massive" />
            <h1 className='title'> {profile.username}</h1>
          </div>
          <img src={profilePicture} className="explorePicture is-hidden-mobile		"></img>
        </div>
        <div className='columns is-multiline  '>
          {profile.photos.map(photo => {
            return (
              <div className="userCard" key={photo.owner}>
                <Link key={photo._id} to={`/profile/${profile._id}/showcomments`}>
                  <div className=''>
                    <img src={photo.image} className="picture card-image column column-user-profile is-active:hover" />
                  </div>
                </Link>
              </div>
            )
          })}
          {/* </div> */}
        </div>
      </div>

    </div>
  )
}


export default UserProfile
