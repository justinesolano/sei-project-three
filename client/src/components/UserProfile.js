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
  const [likes, getLikes] = useState([]) 
  // const [arrayLikes, getArrayLikes] = useState([])
  const [testLikes, getTestLikes] = useState(0)
  console.log(getTestLikes)
  const setArray = []
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/api/profiles/${id}`)
      getLikes(data.photos)
    }
    getData()
  }, [])
  
  const handleLike = event => {
    console.log(event.target.name)
    if (event.target.name === Label.name) { 
      console.log('testtt')
    }
    if (testLikes === 0) getTestLikes(1)
    if (testLikes === 1) getTestLikes(0)

  }




  if (!profile) return null
  return (
    <>
      <div key={profile.id}>
        <h1>{profile.username} </h1>
      </div>
      {likes.map(photo => ( 
        setArray.push(photo.likes), 
        console.log(setArray)
      ))}
      {profile.photos.map(photo => (
        <div key={photo.id}>
          <h3>{photo.title} </h3>
          <img className='photo-userprofile' src={photo.image} alt={photo.title} />
          <Button
            labelPosition='right'
            className="buttontolike"
          >
            <Button icon
              onClick={handleLike}
              name={photo._id}

            >
              <Icon name='heart' />
        Like
            </Button>
            <Label
              as='a'
              basic pointing='left'
              name={photo._id}>
              {photo.likes.length} += {testLikes}
              
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
