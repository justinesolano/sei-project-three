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

  const [commentData, setCommentData] = useState({
    text: ''
  })
  const handleComment = event => {
    console.log('NAME', event.target.name)
    const newFormData = { ...commentData, text: event.target.value }
    setCommentData(newFormData)
  }


  const handleSubmit = event => {
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
        console.log(err)
      }
    }
    setComment()
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
                  <div className='columns card-content'>
                    <div className='column is-three-fifths'>
                      <h5 className='title is-5 title-to-change-padding'>Comments:</h5>
                      {photo.comments.map(comment => (
                        <div key={comment._id}>
                          {<p className='p-userprofile' >
                            <Link to={`/profile/${comment.owner}`} className='change-color-font'> <span className='is-size-5'>👤 - {comment.text}</span><p className='is-size-7'> {new Date(comment.createdAt).toDateString()}</p> </Link>
                          </p>}
                        </div>
                      ))}
                    </div>
                    <div className='column is-left'>
                      <article className='media '>
                        <form onSubmit={handleSubmit}
                          target={profile.id}
                          name={photo._id} >
                          <div className='media-content' >
                            <div className='field'>
                              <p className='control'>
                                <textarea onChange={handleComment} className='textarea normal round-the-image ' placeholder='Add a comment...'></textarea>
                              </p>
                            </div>
                            <nav className='level'>
                              <div className='level-left'>
                                <div className='level-item'>
                                  <button type='submit' className='button is-info is-3 is-danger'>Submit</button>
                                </div>
                              </div>

                              <div className='level-right'>
                              </div>
                            </nav>
                          </div>
                        </form>
                      </article>
                    </div>
                  </div>

                  <br>
                  </br>
                  <time>{new Date(photo.createdAt).toString()}</time>
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
