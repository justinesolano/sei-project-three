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
  if (!profile) return null
  return (
    <div className='card columns is-multiline show-comments is-vcentered'>
      {profile.photos.map(photo => {
        return (
          <>
            <div className='show-comments'>
              <div className='card-image card-width column'>
                <div>
                  <figure className='image'>
                    <img src={photo.image} alt='Placeholder' />
                  </figure>
                </div>
                <div className='card-content'>
                  <div className='media'>
                    <div className='media-left'>
                      <figure className='image is-48x48'>
                        <img src={smileyGreen}alt='Placeholder image'/>
                      </figure>
                    </div>
                    <div className='media-content'>
                      <p className='title is-4'>{photo.title}</p>
                      <p className='subtitle is-6'>📍 {photo.locationName}</p>
                    </div>
                    <button
                      name={`${photo._id}`}
                      className='button is-3'>
                      <span className='big-heart'> ❤️ </span>&nbsp;  &nbsp; &nbsp;     Likes {photo.likes.length}
                    </button>
                  </div>
                </div>
                <div className='content'>
                  <h5 className='title is-5'>Comments:</h5>
                  {photo.comments.map(comment => (
                    <div key={comment._id}>
                      {
                        <p className='p-userprofile' >
                          <Link to={`/profiles/${comment.owner}`}> 👤 - {comment.text} </Link>
                        </p>}
                    </div>
                  ))}
                  <br>
                  </br>
                  <time>11:09 PM - 1 Jan 2016</time>
                </div>
              </div>
            </div>
          </>

        )
      })}

    </div >
  )
}

export default AddCommentsToProfile
