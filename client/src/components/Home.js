import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { getPayloadFromToken } from '../helpers/auth'

import Hero from '../components/Home/Hero'
import Previews from '../components/Home/Previews'
import DetailInfo from '../components/Home/DetailInfo'

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
        const response = await axios.get('/api/profiles')
        response.data.map(user => {
          if (user.id === getPayloadFromToken().sub) {
            setMyNewList(user.myList)
            setMyList(user.myList)
            user.myTags.map(tag => {
              destinationsArray.map(destination => {
                if (destination.tags.includes(tag)) myDestinationArray.push(destination)
                if (destination.suitableFor.includes(tag)) myDestinationArray.push(destination)
                if (destination.continent.includes(tag)) myDestinationArray.push(destination)
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
  }, [rating])

  // GET Hero destination
  useEffect(() => {
    const getHero = async () => {
      try {
        const { data } = await axios.get('/api/destinations')
        setHero(parseFloat(Math.floor(Math.random() * data.length)))
      } catch (err) {
        console.log(err)
      }
    }
    getHero()
  }, [])
  
  // POST new items to My List
  const handleMyList = async (event) => {
    const id = event.target.name
    const profileId = getPayloadFromToken().sub
    const myNewArray = myList
    try {
      myList.map(item => {
        if (item.id === event.target.name) {
          throw new Error
        }
      })
      const { data } = await axios.get(`/api/destinations/${id}`)
      myNewArray.push(data)
      setMyList({ ...myNewArray })
      await axios.post(`/api/profiles/${profileId}/myList`, data, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('token')}`
        }
      }, [])
    } catch (err) {
      console.log('Cannot add to My List')
      window.alert('Error! Cannot add to My List')
    }
  }
  
  // Open info popup
  const handleInfoButton = (event) => {
    setDetailInfoId(event.target.name)
    setMyList(myNewList)
  }

  // Close info popup
  const handleInfoButtonClose = () => {
    setDetailInfoId('')
    setMyList(myNewList)
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
    setRating({
      one: 'icon',
      two: 'icon',
      three: 'icon',
      four: 'icon',
      five: 'icon'
    })
  }

  if (!destinations) return null

  return (
    <div className="home-page is-fullheight-with-navbar">
      <DetailInfo 
        detailInfoId={detailInfoId}
        handleInfoButtonClose={handleInfoButtonClose}
        handleMyList={handleMyList}
        handleRating={handleRating}
        rating={rating}
        destinations={destinations}
      />
      <Hero 
        handleInfoButton={handleInfoButton}
        handleRating={handleRating}
        handleMyList={handleMyList}
        destinations={destinations}
        hero={hero}
        rating={rating}
      />
      <Previews
        handleInfoButton={handleInfoButton} 
        destinations={destinations}
        tagDestinations={tagDestinations}
        myNewList={myNewList}
      />
    </div>
  )
}

export default Home