import React, { useState, useEffect } from 'react'
import { Button, Feed, Icon, Form } from 'semantic-ui-react'
import axios from 'axios'
// import { getPayloadFromToken } from '../helpers/auth'
import feedPicture from '../assets/photofeed.png'

const Explore = () => {
  const [profiles, setProfiles] = useState(null)
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/profiles/')
      setProfiles(data)
    }
    getData()
  }, [])

  //Comments
  const [showComments, setShowComments] = useState(false)


  const [formData] = useState({
    like: true
  })

  const handleLike = async event => {
    const setLikes = async () => {
      try {
        const token = window.localStorage.getItem('token')
        console.log('EVENTT', event.target)
        await axios.post(`/api/profiles/${event.target.id}/photos/${event.target.name}/likes`, formData,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        window.location.reload()

      } catch (err) {
        window.alert('You cannot like the photo, you are not logged in. 😬 ')
      }
    }
    setLikes()
  }


  //ADD COMMENTS

  const [commentData, setCommentData] = useState({
    text: ''
  })


  const handleChange = event => {
    console.log('NAME', event.target.name)
    const newFormData = { ...commentData, text: event.target.value }
    setCommentData(newFormData)
  }


  const handleComment = async event => {
    const setComment = async () => {
      try {
        event.preventDefault()
        const token = window.localStorage.getItem('token')
        console.log(token)
        // console.log('COMMENTS', comments)
        await axios.post(`/api/profiles/${event.target.target}/photos/${event.target.name}`, commentData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        window.location.reload()
      } catch (err) {
        window.alert('You cannot comment on the photo, you are not logged in. 😬')
      }
    }
    setComment()
  }


  if (!profiles) return null

  return (
    <Feed >
      <div className="explore">
        <img src={feedPicture} className="explorePicture"></img>
        {profiles.map((user) => {
          return (
            <Feed.Event key={user._id}>
              <Feed.Content  >
                {user.photos.map((photo) => {
                  return (
                    <div key={photo._id} className="exploreContent" >
                      <Feed.Summary>
                        <Feed.User className="exploreUser" href={`/profile/${user.id}`}>
                          {user.username}
                        </Feed.User >
                        <span className="exploreSpan"> added a photo: </span>
                        <p className="loaction">{photo.title} </p>
                      </Feed.Summary>
                      <p>
                        <Icon name="map pin" />
                        {photo.locationName}
                      </p>
                      <Feed.Extra className="picture">
                        <img src={photo.image} className="picture" />
                      </Feed.Extra>
                      <Feed.Date className="exploreDate">{new Date(photo.createdAt).toString()}
                      </Feed.Date>
                      <div >
                        <Button
                          name={`${photo._id}`}
                          id={`${user.id}`}
                          onClick={handleLike}
                          className="likeButton">
                          <p className="likesArea">❤️  Likes {photo.likes.length}</p>
                        </Button>
                        <Button
                          id="commentsButton"
                          onClick={() => setShowComments(!showComments)}
                          name={`${photo.id}`}>
                          View comments
                        </Button>
                        {
                          showComments ?
                            photo.comments.map(comment => (
                              <div key={comment._id} className="pExplore">
                                {
                                  <p  >
                                    <Icon.Group size="small" href={`/profile/${user.id}`}>
                                      <Icon name="user" />
                                    </Icon.Group>
                                    {comment.text}
                                  </p>
                                }
                              </div>
                            ))
                            :
                            <p></p>
                        }
                        <Form
                          onSubmit={handleComment}
                          target={user.id}
                          name={photo._id} >
                          <Form.TextArea rows={1} onChange={handleChange} />
                          <Button
                            content='Add Comment' labelPosition='left' icon='edit' primary />
                        </Form>
                      </div>
                    </div>
                  )
                })}
              </Feed.Content>
            </Feed.Event>
          )
        })}
      </div>
    </Feed >
  )
}
export default Explore