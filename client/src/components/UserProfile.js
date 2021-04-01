import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import profilePicture from '../assets/profile.png'

import smileyGreen from '../assets/smileyfacegreen.jpg'
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

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/api/profiles/${id}`)
      console.log(data.photos)
    }
    getData()
  }, [])

  if (!profile) return null


  return (
    <div className="everythingProfile">
      <div className='user-profile is-fullheight-with-navbar ' >
        <div className='columns user-profile-header columns'>
          <div className='column'>
            <img src={profilePicture} className='explorePicture is-hidden-touch	'></img>
            <div className='level-item'>
              <Link to='/addpicturetoprofile'>
                <button type='submit' className='button is-info is-small is-danger'>Add a photo.</button>
              </Link>
            </div>
          </div>
          <div className='column'>
            <figure className='image is-96x96 image-to-centre'>
              <img src={smileyGreen} alt='Placeholder image' className='round-the-image' />
            </figure>
          </div>
          <div className='column is-vcentred'>
            <h1 className='title is-hidden-touch'> &nbsp; &nbsp; {profile.username}</h1>

          </div>
        </div>
        <div className='columns is-multiline  '>
          {profile.photos.map(photo => {
            return (
              <Link key={photo._id} to={`/profile/${profile._id}/showcomments`}>
                <div className=''>                <div
                  key={photo._id}
                  title={`${profile.username}`}
                  className='has-tooltip-bottom'
                  data-tooltip={`📍 ${photo.locationName} ❤️ Likes: ${photo.likes.length} 💬 View comments`}>
                  <img src={photo.image} className='picture card-image column column-user-profile button' />
                </div>

                </div>
              </Link>
            )
          })}
          {/* </div> */}
        </div>
      </div>
    </div>
  )
}


export default UserProfile
