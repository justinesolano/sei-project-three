import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import Slider from 'react-slick'
import { sliderSettings } from '../components/slider/settings'

const Home = () => {

  // Add my list key to profiles on backend to use on homepage

  const [destinations, setDestinations] = useState(null)
  const [hero, setHero] = useState(0)
  const [detailInfoId, setDetailInfoId] = useState('')
  const [rating, setRating] = useState({
    one: 'icon',
    two: 'icon',
    three: 'icon',
    four: 'icon',
    five: 'icon'
  })

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
    setRating({
      one: 'icon',
      two: 'icon',
      three: 'icon',
      four: 'icon',
      five: 'icon'
    })
  }

  const handleRating = async (event) => {
    if (event.target.tabIndex > 0) setRating({ one: 'active icon', two: 'icon', three: 'icon', four: 'icon', five: 'icon' })
    if (event.target.tabIndex > 1) setRating({ one: 'active icon', two: 'active icon', three: 'icon', four: 'icon', five: 'icon' })
    if (event.target.tabIndex > 2) setRating({ one: 'active icon', two: 'active icon', three: 'active icon', four: 'icon', five: 'icon' })
    if (event.target.tabIndex > 3) setRating({ one: 'active icon', two: 'active icon', three: 'active icon', four: 'active icon', five: 'icon' })
    if (event.target.tabIndex > 4) setRating({ one: 'active icon', two: 'active icon', three: 'active icon', four: 'active icon', five: 'active icon' })
    await axios.post(`/api/destinations/${event.target.id}/ratings`, { rating: event.target.tabIndex }, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`
      }
    })
  }

  if (!destinations) return null

  return (
    <div className="home-page is-fullheight-with-navbar">
      {detailInfoId ?
        <div className="home-detail-info column">
          <Button className="button secondary home-detail-info-close" onClick={handleInfoButtonClose}>x</Button>
          <img className="hero-image" src={destinations[detailInfoId].image} />
          <div>
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
            <div className="ui star rating" role="radiogroup" onClick={handleRating}
              style={{
                'backgroundColor': 'rgba(225, 225, 225, 0.6)',
                'padding': '10px'
              }}>
              <i tabIndex="1" aria-checked="false" aria-posinset="1" aria-setsize="4" className={destinations[detailInfoId].avgRating > 0 ? 'active icon' : `${rating.one} icon`} role="radio" id={destinations[detailInfoId].id}></i>
              <i tabIndex="2" aria-checked="false" aria-posinset="2" aria-setsize="4" className={destinations[detailInfoId].avgRating > 1 ? 'active icon' : `${rating.two} icon`} role="radio" id={destinations[detailInfoId].id}></i>
              <i tabIndex="3" aria-checked="true" aria-posinset="3" aria-setsize="4" className={destinations[detailInfoId].avgRating > 2 ? 'active icon' : `${rating.three} icon`} role="radio" id={destinations[detailInfoId].id}></i>
              <i tabIndex="4" aria-checked="false" aria-posinset="4" aria-setsize="4" className={destinations[detailInfoId].avgRating > 3 ? 'active icon' : `${rating.four} icon`} role="radio" id={destinations[detailInfoId].id}></i>
              <i tabIndex="5" aria-checked="false" aria-posinset="5" aria-setsize="5" className={destinations[detailInfoId].avgRating > 4 ? 'active icon' : `${rating.five} icon`} role="radio" id={destinations[detailInfoId].id}></i>
            </div>
            <Button className="button secondary" href={`/destinations/${destinations[detailInfoId].name}`}>See more</Button>
          </div>
        </div>
        :
        <div></div>
      }
      <div className="hero">
        <img src={destinations[hero].image}/>
        <div className="columns">
          <div className="hero-info column is-one-third-desktop is-half-tablet is-full-mobile">
            <h1>{destinations[hero].name}</h1>
            <p>{destinations[hero].description}</p>
            <div className="ui star rating" role="radiogroup" onClick={handleRating}
              style={{
                'backgroundColor': 'rgba(225, 225, 225, 0.6)',
                'padding': '10px'
              }}>
              <i tabIndex="1" aria-checked="false" aria-posinset="1" aria-setsize="4" className={destinations[hero].avgRating > 0 ? `active ${rating.one}` : `${rating.one} icon`} role="radio" id={destinations[hero].id}></i>
              <i tabIndex="2" aria-checked="false" aria-posinset="2" aria-setsize="4" className={destinations[hero].avgRating > 1 ? `active ${rating.two}` : `${rating.two} icon`} role="radio" id={destinations[hero].id}></i>
              <i tabIndex="3" aria-checked="true" aria-posinset="3" aria-setsize="4" className={destinations[hero].avgRating > 2 ? `active ${rating.three}` : `${rating.three} icon`} role="radio" id={destinations[hero].id}></i>
              <i tabIndex="4" aria-checked="false" aria-posinset="4" aria-setsize="4" className={destinations[hero].avgRating > 3 ? `active ${rating.four}` : `${rating.four} icon`} role="radio" id={destinations[hero].id}></i>
              <i tabIndex="5" aria-checked="false" aria-posinset="5" aria-setsize="5" className={destinations[hero].avgRating > 4 ? `active ${rating.five}` : `${rating.five} icon`} role="radio" id={destinations[hero].id}></i>
            </div>
            <Button className="button secondary">
              <Link to={`/destinations/${destinations[hero].name}`}
                style={{
                  'color': 'white'
                }}>More Info</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="home-previews">
        <h3>My List</h3>
        <div className="home-container">
          <Slider {...sliderSettings} className="slider">
            {destinations.map(destination => {
              return <div key={destination._id} className="home-item">
                <img src={destination.image} />
                <div className="home-destination-info">
                  <h4>{destination.name}</h4>
                  <p><i>{destination.country}</i></p>
                  <Button className="button secondary" onClick={handleInfoButton} name={`${destinations.indexOf(destination)}`}>More info</Button>
                </div>
              </div> 
            })}
          </Slider>
        </div>
        <h3>Recommended for you</h3>
        <div className="home-container">
          <Slider {...sliderSettings} className="slider">
            {destinations.map(destination => {
              return <div key={destination._id} className="home-item">
                <img src={destination.image} />
                <div className="home-destination-info">
                  <h4>{destination.name}</h4>
                  <p><i>{destination.country}</i></p>
                  <Button className="button secondary" onClick={handleInfoButton} name={`${destinations.indexOf(destination)}`}>More info</Button>
                </div>
              </div>
            })}
          </Slider>
        </div>
        <h3>Trending now</h3>
        <div className="home-container">
          <Slider {...sliderSettings} className="slider">
            {destinations.map(destination => {
              return <div key={destination._id} className="home-item">
                <img src={destination.image} />
                <div className="home-destination-info">
                  <h4>{destination.name}</h4>
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