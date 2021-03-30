import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
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
  const [viewComments, setViewComments] = useState('')
  const handleChange = event => {
    setViewComments(event.target.name)
    console.log(event.target.name)

  }


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
  const [FormData] = useState({
    like: true
  })
  const [eventName, setEventName] = useState('')

  const handleLike = async event => {
    setEventName(event.target.name)
    console.log('>>>', eventName, event.target)
    const token = window.localStorage.getItem('token')
    await axios.post(`/api/profiles/${id}/photos/${event.target.name}/likes`, FormData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
  }




  if (!profile) return null
  return (
    <>
      <div className='user-profile is-fullheight-with-navbar' >
        <h1> TEST </h1>
        <div className='columns is-multiline '>
          {profile.photos.map(photo => {
            return (
              <div key={photo._id} className='column-user-profile column is-one-third
                '>
                <img src={photo.image} className="picture" />
                <div className='user-profile-div-like'>
                  <h3 className='is-7'> {photo.title} </h3>
                  <button
                    onClick={handleLike}
                    name={`${photo.id}`}
                    className='button is-3'>
                    <Icon size='large' name='like outline'></Icon>  &nbsp; Likes {photo.likes.length}
                  </button>
                </div>
                {profile.username} added a photo: {photo.title}
                {new Date(photo.createdAt).toDateString()}

                <div>
                  <button
                    onClick={handleChange}
                    name={`${photo.id}`}
                    className='button is-fullwidth'>
                    View comments</button>
                  
                </div>
                {photo.comments.map(comment => (
                  <div key={comment._id}>
                    {!viewComments &&
                      <p className='p-userprofile' >
                        {comment.text}
                      </p>}
                  </div>
                ))}
              </div>

            )

          })}
          {/* </div> */}
        </div>
      </div>

    </>
  )
}


export default UserProfile
