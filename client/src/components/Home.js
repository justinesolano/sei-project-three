import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

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
        <div>
          <h3 className="ui home-subheader">My List</h3>
          <div className="ui grid">
            <div className="four column row">
              {destinations.map(destination => {
                return (
                  <Link to={`/destinations/${destination.id}`} key={destination.id} className="home-column column home-container">
                    <img src={destination.image} className="home-item"/>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
        <div>
          <h3 className="ui home-subheader">Recommended for you</h3>
          <div className="ui grid">
            <div className="four column row">
              {destinations.map(destination => {
                return (
                  <Link to={`/destinations/${destination.id}`} key={destination.id} className="home-column column home-container">
                    <img src={destination.image} className="home-item"/>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
        <div>
          <h3 className="ui home-subheader">Trending Now</h3>
          <div className="ui grid">
            <div className="four column row">
              {destinations.map(destination => {
                return (
                  <Link to={`/destinations/${destination.id}`} key={destination.id} className="home-column column home-container">
                    <img src={destination.image} className="home-item"/>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home