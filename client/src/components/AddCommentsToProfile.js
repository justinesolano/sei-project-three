import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import smileyGreen from '../assets/smileyfacegreen.jpg'
const AddCommentsToProfile = () => {

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

  const [eventName, setEventName] = useState('')
  const [FormData] = useState({
    like: true
  })
  const handleLike = event => {
    console.log(event.target.name, eventName)
    setEventName(event.target.name)
    const setLikes = async () => {

      try {
        const token = window.localStorage.getItem('token')
        await axios.post(`/api/profiles/${id}/photos/${event.target.name}/likes`, FormData,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        window.location.reload()

      } catch (err) {
        window.alert('You cannot like the photo, you are not logged in. 😬')
      }
    }
    setLikes()
  }
  const [comments, setComments] = useState('')
  const handleComment = event => {
    setComments(event.target.value)
  }
  console.log(comments)

  const handleSubmit = event => {
    event.preventDefault()
    console.log(event.target)
  }


  if (!profile) return null
  return (
    <div className='body-show-comments'>
      <div className='show-comments is-vcentered'>
        <div className='user-profile-header'>
          <div
            title={`${profile.username}`}
            className='has-tooltip-bottom'
            data-tooltip={'👤 Back to profile'}>
            <figure className='image is-96x96 '>
              <Link to={`/profile/${profile._id}`}>
                <img src={smileyGreen} alt='Placeholder image' className='round-the-image' />
              </Link>
            </figure>
          </div>
        </div>
        {profile.photos.map(photo => {
          return (
            <div className='show-comments' key={photo._id}>
              <div className='card-image card-width column'>
                <div>
                  <figure className='image'>
                    <img src={photo.image} alt='Placeholder' />
                  </figure>
                </div>
                <div className='card-content'>
                  <div className='media'>
                    <div className='media-left'>
                      <div
                        title={`${profile.username}`}
                        className='has-tooltip-bottom'
                        data-tooltip={'👤 Back to profile'}>
                        <figure className='image is-48x48'>
                          <Link to={`/profile/${profile._id}`}>
                            <img src={smileyGreen} alt='Placeholder image' />
                          </Link>
                        </figure>
                      </div>
                    </div>
                    <div className='media-content'>
                      <p className='title is-4 is-hidden-mobile'>{photo.title}</p>
                      <p className='subtitle is-6 is-hidden-mobile'>📍 {photo.locationName}</p>
                    </div>
                    <button
                      name={`${photo._id}`}
                      className='button is-3'
                      onClick={handleLike}>
                      <span className='big-heart'> ❤️ </span>&nbsp;  &nbsp; &nbsp;     Likes {photo.likes.length}
                    </button>
                  </div>
                </div>
                <div className='content'>
                  <h5 className='title is-5'>Comments:</h5>
                  {photo.comments.map(comment => (
                    <div key={comment._id}>
                      {<p className='p-userprofile' >
                        <Link to={`/profiles/${comment.owner}`}> 👤 - {comment.text} </Link>
                      </p>}
                    </div>
                  ))}
                  <div>
                    <article className='media '>
                      <figure className='media-right'>
                        <p className='image is-64x64'>
                          <img src='https://bulma.io/images/placeholders/128x128.png' />
                        </p>
                      </figure>
                      <form onSubmit={handleSubmit}>
                        <div className='media-content' >
                          <div className='field'>
                            <p className='control'>
                              <textarea onChange={handleComment} className='textarea is-small' placeholder='Add a comment...'></textarea>
                            </p>
                          </div>
                          <nav className='level'>
                            <div className='level-left'>
                              <div className='level-item'>
                                <button type='submit' className='button is-info'>Submit</button>
                              </div>
                            </div>
                            <div className='level-right'>
                              <div className='level-item'>
                                <label className='checkbox'>
                                  <input type='checkbox' /> Press enter to submit
                                </label>
                              </div>
                            </div>
                          </nav>
                        </div>
                      </form>
                    </article>
                  </div>

                  <br>
                  </br>
                  <time>11:09 PM - 1 Jan 2016</time>
                </div>
              </div>
            </div>
          )
        })}
      </div >
    </div>

  )
}

export default AddCommentsToProfile
