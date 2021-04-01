import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Destination = () => {
  const photoKey = process.env.REACT_APP_PEXELS_ACCESS_TOKEN
  const [apiPhotos, setApiPhotos] = useState(null)
  const [videos, setVideos] = useState(null)
  const { destination } = useParams()

  useEffect(() => {
    try {
      const getVideos = async () => {
        const { data } = await axios.get(
          `https://api.pexels.com/videos/search?query=${destination}`, 
          {
            headers: { Authorization: photoKey }
          }
        )
        setVideos(data.videos)
        console.log(videos)
      }
      const getApiPhotos = async () => {
        const { data } = await axios.get(
          `https://api.pexels.com/v1/search?query=${destination}`, 
          {
            headers: { Authorization: photoKey }
          }
        )
        setApiPhotos(data.photos)
      }
      getVideos()
      getApiPhotos()
    } catch (err) {
      console.log(err)
    }
  }, [])

  if (!videos || !apiPhotos) return null

  return (

    <>
      <div
        className="tile is-parent is-vertical is-gapless one-destination"
        key={destination}
      >
        {/* <h1 className="one-destination-title">{destination}</h1> */}
        {videos.map((video) => {
          return (
            <div
              className="tile is-child notification"
              key={video.id}>
              <video key={video.video_files[0].id} className="card-video" src={video.video_files[0].link} autoPlay={true} muted={true} loop={true}/>
            </div>
          )
        })}
      </div>
      <div
        className="tile is-parent is-vertical is-gapless one-destination"
        key={destination.id}
      >
        {apiPhotos.map((apiPhoto) => {
          return (
            <div
              className="tile is-child notification"
              key={apiPhoto.id}>
              <img className="destination-api-image" key={apiPhoto.id} src={apiPhoto.src.small} />
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Destination
