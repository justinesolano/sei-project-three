import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import Slider from 'react-slick'

const Home = () => {

  const [destinations, setDestinations] = useState(null)
  const [hero, setHero] = useState(0)

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/destinations')
      setDestinations(data)
      
    }
    getData()
  }, [])

  useEffect(() => {
    (!destinations) ? setHero(0) : setHero(parseFloat(Math.floor(Math.random() * destinations.length)))
  })

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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

  console.log(destinations)

  if (!destinations) return null

  return (
    <div className="home">
      <div className="hero">
        <img src={destinations[hero].image} 
          style={{
            'width': '100vw'
          }}/>
        <div className="hero-info">
          <h1>{destinations[hero].name}</h1>
          <p>{destinations[hero].description}</p>
          <Button className="button secondary">
            <Link to="/api/destinations/:id">More Info</Link>
          </Button>
        </div>
      </div>
      <div className="previews">
        <h3 className="ui home-subheader">My List</h3>
        <div className="home-container">
          <Slider {...settings} className="slider">
            {destinations.map(destination => {
              return <div key={destination._id} className="home-item">
                <img src={destination.image} 
                  style={{
                    'width': '500px'
                  }}/>
              </div>
            })}
          </Slider>
        </div>
        <h3 className="ui home-subheader">Recommended for you</h3>
        <div className="home-container">
          <Slider {...settings} className="slider">
            {destinations.map(destination => {
              return <div key={destination._id} className="home-item">
                <img src={destination.image} 
                  style={{
                    'width': '500px'
                  }}/>
              </div>
            })}
          </Slider>
        </div>
        <h3 className="ui home-subheader">Trending now</h3>
        <div className="home-container">
          <Slider {...settings} className="slider">
            {destinations.map(destination => {
              return <div key={destination._id} className="home-item">
                <img src={destination.image} 
                  style={{
                    'width': '500px'
                  }}/>
              </div>
            })}
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default Home