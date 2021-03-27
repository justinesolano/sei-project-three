import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Slider from 'react-slick'

const Destination = () => {

  const settings = {
    arrows: true,
    dots: false,
    infinite: true,
    speed: 1000,
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
      const getPhotos = async () => {
        const { data } = await axios.get(
          `https://api.pexels.com/v1/search?query=${id}`, 
          {
            headers: { Authorization: photoKey }
          }
        )
        setPhotos(data.photos)
      }
      getPhotos()
    } catch (err) {
      console.log(err)
    }
  }, [])

  if (!destinations || !photos) return null

  return (
    <div>
      <div className="destination-detail">
        <Slider {...settings}>
          {photos.map(photo => {
            return <img key={photo.id} src={photo.src.original} />
          })}
        </Slider>
        {destinations.map(destination => {
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
        })}
      </div>
    </div>
  )
}

export default Destination
