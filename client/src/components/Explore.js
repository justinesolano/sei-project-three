import React, { useState, useEffect } from 'react'
import { Button, Feed, Icon } from 'semantic-ui-react'
import axios from 'axios'

import explorePicture from '../assets/explore.png'
import { Link } from 'react-router-dom'

const Explore = () => {
  const [profiles, setProfiles] = useState(null)
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/profiles')
      setProfiles(data)
      console.log(data)
    }
    getData()
  }, [])

  //Comments
  const [showComments, setShowComments] = useState(false)


  if (!profiles) return null

  return (
    <Feed >
      <div className="explore">
        <img src={explorePicture} className="explorePicture"></img>
        {profiles.map((user) => {
          return (
            <Feed.Event key={user.id}>
              <Feed.Content  >
                {user.photos.map((photo) => {
                  return (
                    <div key={photo._id} className="exploreContent" >
                      <Feed.Summary>
                        <Link to={`/userprofile/${user.id}`}>
                          <Feed.User className="exploreUser">
                            {user.username}
                          </Feed.User >
                        </Link>
                        <span className="exploreSpan"> added a photo: </span>
                        <span className="loaction">{photo.title} </span>
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
                          <Icon name="like" />
                        Likes {photo.likes.length}
                          <div >
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
                                        <Link to={`/userprofile/${user.id}`}>
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