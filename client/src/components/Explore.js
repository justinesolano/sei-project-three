import React, { useState, useEffect } from 'react'
import { Feed, Icon } from 'semantic-ui-react'
import axios from 'axios'


const Explore = () => {
  const [profiles, setProfiles] = useState(null)


  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/profiles')
      setProfiles(data)
    }
    getData()
  }, [])


  if (!profiles) return null
  return (
    <Feed >
      {profiles.map((user) => {
        return (
          <Feed.Event key={user._id}>
            <Feed.Content>
              {user.photos.map((photo) => {
                return (
                  <>
                    <Feed.Summary>
                      <Feed.User>
                        {user.username}
                      </Feed.User > added a photo: {photo.title}
                    </Feed.Summary>
                    <Feed.Date key={photo._id}>{ new Date(photo.createdAt).toDateString() }</Feed.Date>
                    <Feed.Extra className='picture' >
                      <img src={photo.image} className='picture' />
                    </Feed.Extra>
                    <Feed.Meta>
                      <Feed.Like >
                        <Icon name="like" />
                        Likes {photo.likes.length}
                      </Feed.Like>
                    </Feed.Meta>
                  </>
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




