import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const UserProfile = () => {
  const { id } = useParams()
  const [profile, setProfile] = useState(null) 

  useEffect(() => { 
    const getData = async () => { 
      const response = await axios.get(`/api/profiles/${id}`)
      setProfile(response.data)
    }
    getData()
  }, [] ) 
  console.log(profile)

  if (!profile) return null 
  return (
    <>
      <div>
        {profile.username}
      </div>
      {profile.photos.map(photo => ( 
        <div  key={photo.title}> 
          <img key={photo.id} className='photo-userprofile' src={photo.image} alt={photo.title} /> 
        </div>
      ) )}
    </>
  )
}

export default UserProfile
