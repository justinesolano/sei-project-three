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
            'height': '50vh'
          }}/>
        <div className="hero-info"
          style={{
            'position': 'absolute',
            'top': '250px',
            'left': 0,
            'color': 'white',
            'width': '40%',
            'backgroundColor': 'rgba(0, 0, 0, 0.5)',
            'padding': '20px'
          }}>
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
        <div>
          <h2 className="ui header">My List</h2>

        </div>
        <div>
          <h2 className="ui header">Recommended for you</h2>

        </div>
        <div>
          <h2 className="ui header">Trending Now</h2>

        </div>
      </div>
    </div>
  )
}

export default Home