import axios from 'axios'
import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import Slider from 'react-slick'
import { sliderSettings } from './Home/SliderSettings'
import { getPayloadFromToken } from '../helpers/auth'


const Home = () => {

  const [destinations, setDestinations] = useState(null)
  const [tagDestinations, setTagDestinations] = useState(null)
  const [myList, setMyList] = useState(null)
  const [myNewList, setMyNewList] = useState(null)
  const [hero, setHero] = useState(0)
  const [detailInfoId, setDetailInfoId] = useState('')
  const [rating, setRating] = useState({
    one: 'icon',
    two: 'icon',
    three: 'icon',
    four: 'icon',
    five: 'icon'
  })

  // GET Destination Data & GET User Profiles
  useEffect(() => {
    const getUsers = async () => {
      const myDestinationArray = []
      try {
        const { data } = await axios.get('/api/destinations')
        setDestinations(data)
        const destinationsArray = data
        setHero(parseFloat(Math.floor(Math.random() * data.length)))
        const response = await axios.get('/api/profiles')
        response.data.map(user => {
          if (user.id === getPayloadFromToken().sub) {
            setMyNewList(user.myList)
            setMyList(user.myList)
            user.myTags.map(tag => {
              destinationsArray.map(destination => {
                if (destination.tags.includes(tag)) myDestinationArray.push(destination)
                if (destination.suitableFor.includes(tag)) myDestinationArray.push(destination)
              })
            })
          }
        })
        setTagDestinations(myDestinationArray)
      } catch (err) {
        console.log(err)
      }
    }
    getUsers()
  }, [])

  // POST new items to My List
  const handleMyList = async (event) => {
    const id = event.target.name
    const profileId = getPayloadFromToken().sub
    const myNewArray = myList
    try {
      const { data } = await axios.get(`/api/destinations/${id}`)
      myNewArray.push(data)
      setMyList({ ...myNewArray })
      await axios.post(`/api/profiles/${profileId}/myList`, data, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('token')}`
        }
      }, [])
    } catch (err) {
      console.log(err)
      window.alert('You need to login to add to your list')
    }
  }
  
  // Open info popup
  const handleInfoButton = (event) => {
    setDetailInfoId(event.target.name)
  }

  // Close info popup
  const handleInfoButtonClose = () => {
    setDetailInfoId('')
  }

  // Post new rating
  const handleRating = async (event) => {
    try {
      await axios.post(`/api/destinations/${event.target.id}/ratings`, { rating: event.target.tabIndex }, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('token')}`
        }
      })
      if (event.target.tabIndex > 0) setRating({ one: 'active icon', two: 'icon', three: 'icon', four: 'icon', five: 'icon' })
      if (event.target.tabIndex > 1) setRating({ one: 'active icon', two: 'active icon', three: 'icon', four: 'icon', five: 'icon' })
      if (event.target.tabIndex > 2) setRating({ one: 'active icon', two: 'active icon', three: 'active icon', four: 'icon', five: 'icon' })
      if (event.target.tabIndex > 3) setRating({ one: 'active icon', two: 'active icon', three: 'active icon', four: 'active icon', five: 'icon' })
      if (event.target.tabIndex > 4) setRating({ one: 'active icon', two: 'active icon', three: 'active icon', four: 'active icon', five: 'active icon' })
    } catch (err) {
      console.log(err)
      window.alert('You need to login to submit a rating')
    }
  }

  if (!destinations) return null

  return (
    <div className="home-page is-fullheight-with-navbar">
      {detailInfoId ?
        <div className="home-detail-info column">
          <Button className="button secondary home-detail-info-close" onClick={handleInfoButtonClose}>x</Button>
          {destinations.map(destination => {
            if (destination.id === detailInfoId) {
              return (
                <div key={destination.id}>
                  <img className="hero-image" src={destination.image} />
                  <div>
                    <h2 className="title">{destination.name}</h2>
                    <p><i>{destination.description}</i></p>
                    <p>Country: {destination.country}</p>
                    <p>Currency: {destination.currency}</p>
                    <p>Language: {destination.language}</p>
                    <div className="columns">
                      <div className="column home-detail-tags">
                        <p>Suitable For: {destination.suitableFor.map((suitable, index) => {
                          return <li key={index}>{suitable}</li>
                        })}</p>
                      </div>
                      <div className="column home-detail-tags">
                        <p>Tags: {destination.tags.map((tag, index) => {
                          return <li key={index}>{tag}</li>
                        })}</p>
                      </div>
                      <div className="column home-detail-tags">
                        <p>Highlights: {destination.highlights.map((highlight, index) => {
                          return <li key={index}>{highlight}</li>
                        })}</p>
                      </div>
                    </div>
                    <div className="ui star rating" role="radiogroup" onClick={handleRating}
                      style={{
                        'backgroundColor': 'rgba(225, 225, 225, 0.6)',
                        'padding': '10px'
                      }}>
                      <i tabIndex="1" aria-checked="false" aria-posinset="1" aria-setsize="4" className={destination.avgRating > 0 ? 'active icon' : `${rating.one} icon`} role="radio" id={destination.id}></i>
                      <i tabIndex="2" aria-checked="false" aria-posinset="2" aria-setsize="4" className={destination.avgRating > 1 ? 'active icon' : `${rating.two} icon`} role="radio" id={destination.id}></i>
                      <i tabIndex="3" aria-checked="true" aria-posinset="3" aria-setsize="4" className={destination.avgRating > 2 ? 'active icon' : `${rating.three} icon`} role="radio" id={destination.id}></i>
                      <i tabIndex="4" aria-checked="false" aria-posinset="4" aria-setsize="4" className={destination.avgRating > 3 ? 'active icon' : `${rating.four} icon`} role="radio" id={destination.id}></i>
                      <i tabIndex="5" aria-checked="false" aria-posinset="5" aria-setsize="5" className={destination.avgRating > 4 ? 'active icon' : `${rating.five} icon`} role="radio" id={destination.id}></i>
                    </div>
                    <Button className="button secondary" href={`/explore/${destination.name}`}>Explore</Button>
                  </div>
                </div>
              )
            }
          })}
        </div>
        :
        <div></div>
      }
      <div className="hero">
        <img src={destinations[hero].image}/>
        <div className="columns">
          <div className="hero-info column is-half-tablet is-full-mobile">
            <h1 className="title">{destinations[hero].name}</h1>
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
            <br />
            <Button className="button secondary" onClick={handleInfoButton} name={`${destinations[hero].id}`}>More info</Button>
            <Button className="button secondary" name={destinations[hero].id} onClick={handleMyList}>My List</Button>
          </div>
        </div>
      </div>
      <div className="home-previews">
        <h3>My List</h3>
        {myNewList ?
          <div className="home-container">
            <Slider {...sliderSettings} className="slider">
              {myNewList.map(destination => {
                return <div key={destination._id} className="home-item">
                  <img src={destination.image} />
                  <div className="home-destination-info">
                    <h4>{destination.name}</h4>
                    <p><i>{destination.country}</i></p>
                    <Button className="button secondary" onClick={handleInfoButton} name={`${destination.id}`}>More info</Button>
                  </div>
                </div> 
              })}
            </Slider>
          </div>
          :
          <div></div>
        }
        {tagDestinations &&
          <>
            {tagDestinations.length > 0 &&
            <>
              <h3>Recommended for you</h3>
              <div className="home-container">
                <Slider {...sliderSettings} className="slider">
                  {tagDestinations.map(destination => {
                    return <div key={destination._id} className="home-item">
                      <img src={destination.image} />
                      <div className="home-destination-info">
                        <h4>{destination.name}</h4>
                        <p><i>{destination.country}</i></p>
                        <Button className="button secondary" onClick={handleInfoButton} name={`${destination.id}`}>More info</Button>
                      </div>
                    </div>
                  })}
                </Slider>
              </div>
            </>
            }
          </>
        }
        <h3>Must See</h3>
        <div className="home-container">
          <Slider {...sliderSettings} className="slider">
            {destinations.map(destination => {
              if (destination.currency === 'Euro')
                return <div key={destination._id} className="home-item">
                  <img src={destination.image} />
                  <div className="home-destination-info">
                    <h4>{destination.name}</h4>
                    <p><i>{destination.country}</i></p>
                    <Button className="button secondary" onClick={handleInfoButton} name={`${destination.id}`}>More info</Button>
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
                  <Button className="button secondary" onClick={handleInfoButton} name={`${destination.id}`}>More info</Button>
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