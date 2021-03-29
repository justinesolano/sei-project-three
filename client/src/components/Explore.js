import React, { useState, useEffect } from 'react'
import { Button, Feed, Icon } from 'semantic-ui-react'
import axios from 'axios'
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
  const [viewComments, setViewComments] = useState('')
  const handleChange = event => {
    setViewComments(event.target.name)
    console.log(event.target.name)
  }

  if (!profiles) return null

  return (
    <Feed >
      {profiles.map((user) => {
        return (
          <Feed.Event key={user.id}>
            <Feed.Content>
              {user.photos.map((photo) => {
                return (
                  <div key={photo._id}>
                    <Feed.Summary>
                      <Feed.User>
                        {user.username}
                      </Feed.User > added a photo: {photo.title}
                    </Feed.Summary>
                    <Feed.Date>{new Date(photo.createdAt).toDateString()}</Feed.Date>
                    <Feed.Extra className="picture">
                      <img src={photo.image} className="picture" />
                    </Feed.Extra>
                    <Feed.Meta>
                      <Feed.Like >
                        <Icon name="like" />
                          Likes {photo.likes.length}
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
                  </div>
                )
              })}
            </Feed.Content>
          </Feed.Event>
        )
      })}
    </Feed>
  )
}
export default Explore