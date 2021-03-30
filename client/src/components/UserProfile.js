import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Button, Icon, Feed, Grid } from 'semantic-ui-react'

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
      <Feed >
        <Grid container >
          <div className='columns'>
            {/* <div className='columns columns-insta'> */}
            {profile.photos.map(photo => {
              return (
                <div key={photo._id} className='column 
                is-gapless'>
                  <Grid.Column >
                    <Grid.Row columns={3}>
                      <Feed.Extra className="picture">
                        <img src={photo.image} className="picture" />
                      </Feed.Extra>
                      <Feed.Meta>
                        <Feed.Like >
                          <Button
                            onClick={handleLike}
                            name={`${photo.id}`}>
                            <Icon name="like" />
                        Likes {photo.likes.length}
                          </Button>

                          <div>
                            <Button
                              onClick={handleChange}
                              name={`${photo.id}`}>
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
                        </Feed.Like>

                      </Feed.Meta>
                      <Feed.Summary>
                        <Feed.User>
                          {profile.username}
                        </Feed.User > added a photo: {photo.title}
                      </Feed.Summary>
                      <Feed.Date>{new Date(photo.createdAt).toDateString()}</Feed.Date>
                    </Grid.Row>
                  </Grid.Column>
                </div>

              )

            })}
            {/* </div> */}
          </div>
        </Grid>
      </Feed>
    </>
  )
}


export default UserProfile
