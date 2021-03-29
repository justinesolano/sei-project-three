import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import DestinationCard from './DestinationCard'
import { Grid, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


const ExploreDestination = () => {

  const [userPhotos, setUserPhotos] = useState(null)

  useEffect(() => {
    const getTheData = async () => {
      const { data } = await axios.get('/api/profiles')
      setUserPhotos(data)
    }
    getTheData()
  }, [])

  if (!userPhotos) return null
  return (
    <Grid className="explore-destination-grid">
      {userPhotos.map((users) => {
        return (
          <Grid.Row className="explore-grid-row" key={users._id} columns= {4}>
            {users.photos.map((photo) => {
              return (
                <Grid.Column key={photo.id} className="explore-grid-columns">
                  <Link to={`/userprofile/${users._id}`}>
                    <Image src={photo.image} alt={`${users._id}`}/>
                  </Link>
                </Grid.Column>
              )
            })}
          </Grid.Row>
        )
      })}
    </Grid>
  )



  // return (
  //   <div className="explore-page">

  //     <div className="card-parent">
  //       { userPhotos &&
  //       <div className="column">
  //         { userPhotos.map(users => (
  //           <DestinationCard key={users._id} { ...users } />
  //         ))}
  //       </div>
  //       }
  //     </div>
  //   </div>
  // )
}

export default ExploreDestination

