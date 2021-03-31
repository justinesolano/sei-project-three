import React, { useState, useEffect } from 'react'
import { Button, Feed, Icon } from 'semantic-ui-react'
import axios from 'axios'
// import { getPayloadFromToken } from '../helpers/auth'
import feedPicture from '../assets/photofeed.png'
import { Link } from 'react-router-dom'

const Explore = () => {
  const [profiles, setProfiles] = useState(null)
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/profiles/')
      setProfiles(data)
      console.log(data)
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
        console.log(event.target.id)
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


  if (!profiles) return null

  return (
    <Feed >
      <div className="explore">
        <img src={feedPicture} className="explorePicture"></img>
        {profiles.map((user) => {
          return (
            <Feed.Event key={user.id}>
              <Feed.Content  >
                {user.photos.map((photo) => {
                  return (
                    <div key={photo._id} className="exploreContent" >
                      <Feed.Summary>
                        <Link to={`/profile/${user.id}`}>
                          <Feed.User className="exploreUser">
                            {user.username}
                          </Feed.User >
                        </Link>
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
                      <Feed.Meta>
                        <Feed.Like >
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
                                        <Link to={`/profile/${user.id}`}>
                                          <Icon.Group size="small">
                                            <Icon size="big" name="circle outline" />
                                            <Icon name="user" />
                                          </Icon.Group>
                                          {comment.text}
                                        </Link>
                                      </p>
                                    }
                                  </div>
                                ))
                                :
                                <p></p>
                            }
                          </div>
                        </Feed.Like>
                      </Feed.Meta>
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