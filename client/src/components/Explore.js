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
  const [showComments, setShowComments] = useState(false)


  if (!profiles) return null

  return (
    <Feed >
      {profiles.map((user) => {
        return (
          <Feed.Event key={user.id}>
            <Feed.Content className="explore">
              {user.photos.map((photo) => {
                return (
                  <div key={photo._id}>
                    <Feed.Summary>
                      <Feed.User>
                        {user.username}
                      </Feed.User > added a photo: {photo.title}
                    </Feed.Summary>
                    <Feed.Date className="exploreDate">{new Date(photo.createdAt).toString()}</Feed.Date>
                    <Feed.Extra className="picture">
                      <img src={photo.image} className="picture" />
                    </Feed.Extra>
                    <Feed.Meta>
                      <Feed.Like >
                        <Icon name="like" />
                        Likes {photo.likes.length}
                        <div>
                          <Button
                            onClick={() => setShowComments(!showComments)}
                            name={`${photo.id}`}>
                            View comments</Button>
                          {
                            showComments ?

                              photo.comments.map(comment => (
                                <div key={comment._id}>
                                  {
                                    <p >
                                      {comment.text}
                                    </p>}
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
    </Feed>
  )
}
export default Explore