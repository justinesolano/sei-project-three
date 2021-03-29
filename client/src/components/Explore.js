import React, { useState, useEffect } from 'react'
import { Button, Feed, Icon } from 'semantic-ui-react'
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
<<<<<<< HEAD


  //Comments
  const [viewComments, setViewComments] = useState('')
  const handleChange = event => {
    setViewComments(event.target.name)
    console.log(event.target.name)
  }



=======
  
  console.log(profiles[0].username)
>>>>>>> development

  const handleUser = () => {
    for (let i = 0; i < profiles.length; i++) {
      return profiles[i].username
    }
  }


  return (
<<<<<<< HEAD
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
                    <Feed.Date key={photo._id}>{new Date(photo.createdAt).toDateString()}</Feed.Date>
                    <Feed.Extra className='picture' >
                      <img src={photo.image} className='picture' />
                    </Feed.Extra>
                    <Feed.Meta>
                      <Feed.Like >
                        <Icon name="like" />
                         Likes {photo.likes.length}
                        <div>
                          <Button
                            onClick={handleChange}
                            name={`${photo._id}`}
                            key={photo.index}>
                            View comments</Button>
                          {photo.comments.map(comment => (
                            <>
                              {!viewComments &&
                                <p key={comment._id}>
                                  {comment.text}
                                </p>}
                            </>
                          ))}
                        </div>
                      </Feed.Like>
                    </Feed.Meta>
                  </>
                )
              })}
            </Feed.Content>
          </Feed.Event>
        )
      })}
      {/* <Feed.Event>
=======
    <Feed>
      <Feed.Event>
        <Feed.Label>
          <img src="/images/avatar/small/elliot.jpg" />
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary>
            <Feed.User>{handleUser}</Feed.User> added you as a friend
            <Feed.Date>1 Hour Ago</Feed.Date>
          </Feed.Summary>
          <Feed.Meta>
            <Feed.Like>
              <Icon name="like" />4 Likes
            </Feed.Like>
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>

      <Feed.Event>
>>>>>>> development
        <Feed.Label image="/images/avatar/small/helen.jpg" />
        <Feed.Content>
          <Feed.Summary>
            <a>Helen Troy</a> added <a>2 new illustrations</a>
            <Feed.Date>4 days ago</Feed.Date>
          </Feed.Summary>
          <Feed.Extra images>
            <a>
              <img src="/images/wireframe/image.png" />
            </a>
            <a>
              <img src="/images/wireframe/image.png" />
            </a>
          </Feed.Extra>
          <Feed.Meta>
            <Feed.Like>
              <Icon name="like" />1 Like
            </Feed.Like>
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>

      <Feed.Event>
        <Feed.Label image="/images/avatar/small/jenny.jpg" />
        <Feed.Content>
          <Feed.Summary
            date="2 Days Ago"
            user="Jenny Hess"
            content="add you as a friend"
          />
          <Feed.Meta>
            <Feed.Like>
              <Icon name="like" />8 Likes
            </Feed.Like>
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>

      <Feed.Event>
        <Feed.Label image="/images/avatar/small/joe.jpg" />
        <Feed.Content>
          <Feed.Summary>
            <a>Joe Henderson</a> posted on his page
            <Feed.Date>3 days ago</Feed.Date>
          </Feed.Summary>
          <Feed.Extra text>
            Hello
          </Feed.Extra>
          <Feed.Meta>
            <Feed.Like>
              <Icon name="like" />5 Likes
            </Feed.Like>
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>

      <Feed.Event>
        <Feed.Label image="/images/avatar/small/justen.jpg" />
        <Feed.Content>
          <Feed.Summary>
            <a>Justen Kitsune</a> added <a>2 new photos</a> of you
            <Feed.Date>4 days ago</Feed.Date>
          </Feed.Summary>
          <Feed.Extra images>
            <a>
              <img src="/images/wireframe/image.png" />
            </a>
            <a>
              <img src="/images/wireframe/image.png" />
            </a>
          </Feed.Extra>
          <Feed.Meta>
            <Feed.Like>
              <Icon name="like" />
              41 Likes
            </Feed.Like>
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>
    </Feed>
  )
}

export default Explore




