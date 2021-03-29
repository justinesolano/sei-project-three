import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import Slider from 'react-slick'

const Home = () => {

  // Add my list key to profiles on backend to use on homepage

  const [destinations, setDestinations] = useState(null)
  const [hero, setHero] = useState(0)
  const [detailInfoId, setDetailInfoId] = useState('')
  const [ratingOne, setRatingOne] = useState('icon')
  const [ratingTwo, setRatingTwo] = useState('icon')
  const [ratingThree, setRatingThree] = useState('icon')
  const [ratingFour, setRatingFour] = useState('icon')
  const [ratingFive, setRatingFive] = useState('icon')


  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/destinations')
      setDestinations(data)
      setHero(parseFloat(Math.floor(Math.random() * data.length)))
      console.log(data)
    }
    getData()
  }, [])

  const handleInfoButton = (event) => {
    setDetailInfoId(event.target.name)
  }

  const handleInfoButtonClose = () => {
    setDetailInfoId('')
  }

  const handleRating = async (event) => {
    if (event.target.tabIndex > 0) setRatingOne('active icon')
    if (event.target.tabIndex > 1) setRatingTwo('active icon')
    if (event.target.tabIndex > 2) setRatingThree('active icon')
    if (event.target.tabIndex > 3) setRatingFour('active icon')
    if (event.target.tabIndex > 4) setRatingFive('active icon')
    console.log(event.target.id)
    await axios.post(`/api/destinations/${event.target.id}/ratings`, { rating: event.target.tabIndex }, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`
      }
    })
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
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1
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
    <div className="home-page is-fullheight-with-navbar">
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
            {destinations[detailInfoId].avgRating !== 'Not yet rated' ? <p><i>Average Rating: {destinations[detailInfoId].avgRating}</i></p> : <p><i>Not yet rated</i></p>}
            <div className="ui star rating" role="radiogroup" onClick={handleRating}
              style={{
                'backgroundColor': 'rgba(225, 225, 225, 0.6)',
                'padding': '10px'
              }}>
              <i tabIndex="1" aria-checked="false" aria-posinset="1" aria-setsize="4" className={ratingOne} role="radio" id={destinations[hero].id}></i>
              <i tabIndex="2" aria-checked="false" aria-posinset="2" aria-setsize="4" className={ratingTwo} role="radio" id={destinations[hero].id}></i>
              <i tabIndex="3" aria-checked="true" aria-posinset="3" aria-setsize="4" className={ratingThree} role="radio" id={destinations[hero].id}></i>
              <i tabIndex="4" aria-checked="false" aria-posinset="4" aria-setsize="4" className={ratingFour} role="radio" id={destinations[hero].id}></i>
              <i tabIndex="5" aria-checked="false" aria-posinset="5" aria-setsize="5" className={ratingFive} role="radio" id={destinations[hero].id}></i>
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
            {destinations[hero].avgRating !== 'Not yet rated' ? <p><i>Average Rating: {destinations[hero].avgRating}</i></p> : <p><i>Not yet rated</i></p>}
            <div className="ui star rating" role="radiogroup" onClick={handleRating}
              style={{
                'backgroundColor': 'rgba(225, 225, 225, 0.6)',
                'padding': '10px'
              }}>
              <i tabIndex="1" aria-checked="false" aria-posinset="1" aria-setsize="4" className={ratingOne} role="radio" id={destinations[hero].id}></i>
              <i tabIndex="2" aria-checked="false" aria-posinset="2" aria-setsize="4" className={ratingTwo} role="radio" id={destinations[hero].id}></i>
              <i tabIndex="3" aria-checked="true" aria-posinset="3" aria-setsize="4" className={ratingThree} role="radio" id={destinations[hero].id}></i>
              <i tabIndex="4" aria-checked="false" aria-posinset="4" aria-setsize="4" className={ratingFour} role="radio" id={destinations[hero].id}></i>
              <i tabIndex="5" aria-checked="false" aria-posinset="5" aria-setsize="5" className={ratingFive} role="radio" id={destinations[hero].id}></i>
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
          <Slider {...settings} className="slider">
            {destinations.map(destination => {
              return <div key={destination._id} className="home-item">
                <img src={destination.image} />
                <div className="home-destination-info">
                  <h4>{destination.name}</h4>
                  <p><i>{destination.country}</i></p>
                  <p>Rating: {destination.avgRating}</p>
                  <Button className="button secondary" onClick={handleInfoButton} name={`${destinations.indexOf(destination)}`}>More info</Button>
                </div>
              </div> 
            })}
          </Slider>
        </div>
        <h3>Recommended for you</h3>
        <div className="home-container">
          <Slider {...settings} className="slider">
            {destinations.map(destination => {
              return <div key={destination._id} className="home-item">
                <div className="columns">
                  <img src={destination.image} className="column"/>
                </div>
                <div className="home-destination-info">
                  <h4>{destination.name}</h4>
                  <p><i>{destination.country}</i></p>
                  <p>Rating: {destination.avgRating}</p>
                  <Button className="button secondary" onClick={handleInfoButton} name={`${destinations.indexOf(destination)}`}>More info</Button>
                </div>
              </div>
            })}
          </Slider>
        </div>
        <h3>Trending now</h3>
        <div className="home-container">
          <Slider {...settings} className="slider">
            {destinations.map(destination => {
              return <div key={destination._id} className="home-item">
                <div className="columns">
                  <img src={destination.image} className="column"/>
                </div>
                <div className="home-destination-info">
                  <h4>{destination.name}</h4>
                  <p><i>{destination.country}</i></p>
                  <p>Rating: {destination.avgRating}</p>
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