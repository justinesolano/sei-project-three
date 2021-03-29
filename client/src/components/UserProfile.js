import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Button, Icon, Label } from 'semantic-ui-react'


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
  const [likePhoto, setLikePhoto] = useState('')
  const [FormData, setFormdata] = useState({
    like: true
  })
  console.log(setFormdata)
  const [toggleForLike, setToggleForLike] = useState(false)
  const handleLike = async event => {
    if (toggleForLike === false) {
      setToggleForLike(true)
      const token = window.localStorage.getItem('token')
      setLikePhoto(event.target.name)
      console.log(likePhoto)
      const setData = await axios.post(`/api/profiles/${id}/photos/${likePhoto}/likes`, FormData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      console.log(setData)
    } else {
      setToggleForLike(false)
      // const token = window.localStorage.getItem('token')
      const getLikesFromApi = await axios.get(`/api/profiles/${id}`)
      console.log(getLikesFromApi.data._id)
      console.log('value >>> ', event.target.value)
      setLikePhoto(event.target.name)
      console.log(likePhoto)
      // await axios.delete(`/api/profiles/${id}/photos/${likePhoto}/likes/`, FormData,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`
      //     }
      //   })
    }

  }



  if (!profile) return null

  return (
    <>
      <div key={profile.id}>
        <h1>{profile.username} </h1>
      </div>
      {profile.photos.map(photo => (
        <div key={photo.id}>
          <h3>{photo.title} </h3>
          <img className='photo-userprofile' src={photo.image} alt={photo.title} />
          <Button
            labelPosition='right'>
            <Button icon
              onClick={handleLike}
              name={photo._id}
            >
              <Icon name='heart' />
        Like
            </Button>
            <Label
              as='a'
              basic pointing='left'>
              {photo.likes.length}
            </Label>
          </Button>
          <div>
            <Button
              onClick={handleChange}
              name={`${photo.title}`}>
              View comments</Button>
            {photo.comments.map(comment => (
              <div key={comment._id}>
                {!viewComments &&
                  <p >
                    {comment.text}
                  </p>}
              </div>
            ))}
          </div>
        </div>
      ))}

    </>
  )
}


export default UserProfile
