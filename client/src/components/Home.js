import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import Slider from 'react-slick'

const Home = () => {

  const [destinations, setDestinations] = useState(null)
  const [hero, setHero] = useState(0)
  const [detailInfoId, setDetailInfoId] = useState('')

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/destinations')
      setDestinations(data)
      setHero(parseFloat(Math.floor(Math.random() * data.length)))
    }
    getData()
  }, [])
  
  const handleInfoButton = (event) => {
    setDetailInfoId(event.target.name)
  }

  const handleInfoButtonClose = () => {
    setDetailInfoId('')
  }

  const settings = {
    arrows: true,
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 2,
    initialSlide: 0,
    autoplay: false,
    focusOnSelect: true,
    dragable: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  }

  if (!destinations) return null

  return (
    <div className="home">
      {detailInfoId ?
        <div className="home-detail-info">
          <Button className="button secondary home-detail-info-close" onClick={handleInfoButtonClose}>x</Button>
          <img src={destinations[detailInfoId].image} 
            style={{
              'width': '65vw'
            }}/>
          <div
            style={{
              'width': '65vw'
            }}>
            <h2>{destinations[detailInfoId].name}</h2>
            <p><i>{destinations[detailInfoId].description}</i></p>
            <p>Country: {destinations[detailInfoId].country}</p>
            <p>Currency: {destinations[detailInfoId].currency}</p>
            <p>Language: {destinations[detailInfoId].language}</p>
            <p>Suitable For: {destinations[detailInfoId].suitableFor.map((suitable, index) => {
              return <li key={index}>{suitable}</li>
            })}</p>
            <p>Tags: {destinations[detailInfoId].tags.map((tag, index) => {
              return <li key={index}>{tag}</li>
            })}</p>
            <p>Highlights: {destinations[detailInfoId].highlights.map((highlight, index) => {
              return <li key={index}>{highlight}</li>
            })}</p>
            <Button className="button secondary" href={`/destinations/${destinations[detailInfoId].id}`}>See more</Button>
          </div>
        </div>
        :
        <div></div>
      }
      <div className="hero">
        <img src={destinations[hero].image} 
          style={{
            'width': '100vw',
            'max-height': '50vh'
          }}/>
        <div className="hero-info">
          <h1>{destinations[hero].name}</h1>
          <p>{destinations[hero].description}</p>
          <Button className="button secondary">
            <Link to="/api/destinations/:id"
              style={{
                'color': 'white'
              }}>More Info</Link>
          </Button>
        </div>
      </div>
      <div className="previews">
        <h3 className="ui home-subheader">My List</h3>
        <div className="home-container">
          <Slider {...settings} className="slider">
            {destinations.map(destination => {
              return <div key={destination._id} className="home-item">
                <div className="columns">
                  <img src={destination.image} className="column"/>
                </div>
                <div className="home-destination-info">
                  <h3>{destination.name}</h3>
                  <p><i>{destination.country}</i></p>
                  <Button className="button secondary" onClick={handleInfoButton} name={`${destinations.indexOf(destination)}`}>More info</Button>
                </div>
              </div>
            })}
          </Slider>
        </div>
        <h3 className="ui home-subheader">Recommended for you</h3>
        <div className="home-container">
          <Slider {...settings} className="slider">
            {destinations.map(destination => {
              return <div key={destination._id} className="home-item">
                <div className="columns">
                  <img src={destination.image} className="column"/>
                </div>
                <div className="home-destination-info">
                  <h3>{destination.name}</h3>
                  <p><i>{destination.country}</i></p>
                  <Button className="button secondary" onClick={handleInfoButton} name={`${destinations.indexOf(destination)}`}>More info</Button>
                </div>
              </div>
            })}
          </Slider>
        </div>
        <h3 className="ui home-subheader">Trending now</h3>
        <div className="home-container">
          <Slider {...settings} className="slider">
            {destinations.map(destination => {
              return <div key={destination._id} className="home-item">
                <div className="columns">
                  <img src={destination.image} className="column"/>
                </div>
                <div className="home-destination-info">
                  <h3>{destination.name}</h3>
                  <p><i>{destination.country}</i></p>
                  <Button className="button secondary" onClick={handleInfoButton} name={`${destinations.indexOf(destination)}`}>More info</Button>
                </div>
              </div>
            })}
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default Home