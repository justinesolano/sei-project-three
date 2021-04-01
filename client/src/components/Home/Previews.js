import React from 'react'
import { Button } from 'semantic-ui-react'
import Slider from 'react-slick'
import { sliderSettings } from './SliderSettings'

const Previews = ({ handleInfoButton, destinations, myNewList, tagDestinations }) => {

  return (
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
  )
}

export default Previews
