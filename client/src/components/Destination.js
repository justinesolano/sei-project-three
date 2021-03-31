import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Destination = () => {
  const photoKey = process.env.REACT_APP_PEXELS_ACCESS_TOKEN
  console.log(photoKey)
  const [apiPhotos, setApiPhotos] = useState(null)
  const [videos, setVideos] = useState(null)
  const { destination } = useParams()

  console.log('ID', destination)

  useEffect(() => {
    try {
      const getVideos = async () => {
        const { data } = await axios.get(
          `https://api.pexels.com/videos/search?query=${destination}`, 
          {
            headers: { Authorization: '563492ad6f91700001000001e598b2cbf2844705b19005a497565bfe' }
          }
        )
        setVideos(data.videos)
        console.log(videos)
      }
      const getApiPhotos = async () => {
        const { data } = await axios.get(
          `https://api.pexels.com/v1/search?query=${destination}`, 
          {
            headers: { Authorization: '563492ad6f91700001000001e598b2cbf2844705b19005a497565bfe' }
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
    <div
      className="tile is-parent is-vertical is-3 is-gapless"
      key={destination}
    >
      {videos.map((video) => {
        return (
          <div
            className="tile is-child notification"
            key={video.id}>
            <video key={video.video_files[0].id} className="card-video" src={video.video_files[0].link} autoPlay={true} muted={true} loop={true}/>
          </div>
        )
      })}
      {apiPhotos.map((apiPhoto) => {
        return (
          <div
            className="tile is-child notification"
            key={apiPhoto.id}>
            <img key={apiPhoto.id} src={apiPhoto.src.small} />
          </div>
        )
      })}
    </div>
  )
}

export default Destination
