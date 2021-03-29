import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Slider from 'react-slick'

const Destination = () => {

  const settings = {
    arrows: true,
    dots: false,
    infinite: true,
    speed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    focusOnSelect: true,
    dragable: true
  }

  const photoKey = process.env.REACT_APP_PEXELS_ACCESS_TOKEN

  const [destinations, setDestinations] = useState(null)
  const [photos, setPhotos] = useState(null)
  const [videos, setVideos] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/destinations')
      setDestinations(data)
    }
    getData()
  }, [])

  useEffect(() => {
    try {
      const getVideos = async () => {
        const { data } = await axios.get(
          `https://api.pexels.com/videos/search?query=${id}`, 
          {
            headers: { Authorization: photoKey }
          }
        )
        setVideos(data.videos)
        console.log(videos)
      }
      const getPhotos = async () => {
        const { data } = await axios.get(
          `https://api.pexels.com/v1/search?query=${id}`, 
          {
            headers: { Authorization: photoKey }
          }
        )
        setPhotos(data.photos)
      }
      getVideos()
      console.log(videos)
      getPhotos()
    } catch (err) {
      console.log(err)
    }
  }, [])

  if (!destinations || !videos || !photos) return null

  return (
    <div>
      <div className="destination-detail is-hero">
        <Slider {...settings}>
          {photos.map(photo => {
            return <img key={photo.id} src={photo.src.original} />
          })}
        </Slider>
        {/* {destinations.map(destination => {
          if (destination.name === id) {
            return (
              <div key={destination.id} className="destination-detail-info">
                <h2>{destination.name}</h2>
                <p><i>{destination.description}</i></p>
                <p>Country: {destination.country}</p>
                <p>Currency: {destination.currency}</p>
                <p>Language: {destination.language}</p>
                <p>Suitable For: {destination.suitableFor.map((suitable, index) => {
                  return <li key={index}>{suitable}</li>
                })}</p>
                <p>Tags: {destination.tags.map((tag, index) => {
                  return <li key={index}>{tag}</li>
                })}</p>
                <p>Highlights: {destination.highlights.map((highlight, index) => {
                  return <li key={index}>{highlight}</li>
                })}</p>
              </div>
            )
          }
        })} */}
        <div className="columns is-multiline">
          {videos.map(video => {
            return (
              <div className="column is-one-quarter-desktop is-one-third-tablet" key={video.id}>
                <div className="card">
                  {/* {video.video_files.map(item => {
                    return (
                      <video key={item.id} className="card-image" src={item.link} autoPlay={true} muted={true} loop={true}/>
                    )
                  })} */}
                  <video key={video.video_files[0].id} className="card-image" src={video.video_files[0].link} autoPlay={true} muted={true} loop={true}/>
                  <div className="card-content">{video.user.name}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Destination
