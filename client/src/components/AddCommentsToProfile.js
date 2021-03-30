import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
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
    <div className="card">
      {profile.photos.map(photo => {
        return (
          <>
            <div className="card-image">
              <figure className="image is-4by3">
                <img src={photo.image} alt="Placeholder image" />
              </figure>
            </div>
            <div className="card-content">
              <div className="media">
                <div className="media-left">
                  <figure className="image is-48x48">
                    <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
                  </figure>
                </div>
                <div className="media-content">
                  <p className="title is-4">{photo.title}</p>
                  <p className="subtitle is-6">{photo.locationName}</p>
                  <button
                    name={`${photo._id}`}
                    className='button is-3'>
                    <Icon size='large' name='like outline'></Icon>  &nbsp;  &nbsp; &nbsp;     Likes {photo.likes.length}
                  </button>
                </div>
              </div>

              <div className="content">
                <h5 className="title is-5">Comments:</h5>
                {photo.comments.map(comment => (
                  <div key={comment._id}>
                    {
                      <p className='p-userprofile' >
                        <Link to={`/userprofiles/${comment.owner}`}><Icon name='user' />- {comment.text} </Link>
                      </p>}
                  </div>
                ))}
                <br>
                </br>
                <time>11:09 PM - 1 Jan 2016</time>
              </div>
            </div>

          </>

        )
      })}

    </div>
  )
}

export default AddCommentsToProfile
