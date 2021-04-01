import React from 'react'
import { Button } from 'semantic-ui-react'

const Hero = ({ handleInfoButton, handleRating, handleMyList, destinations, hero, rating }) => {
  return (
    <div className="hero">
      <img src={destinations[hero].image}/>
      <div className="columns">
        <div className="hero-info column is-half-tablet is-full-mobile">
          <h1 className="title">{destinations[hero].name}</h1>
          <p>{destinations[hero].description}</p>
          <div className="ui large star rating" role="radiogroup" name="hero-rating" onClick={handleRating}
            style={{
              'backgroundColor': 'rgba(225, 225, 225, 0.6)',
              'padding': '10px'
            }}>
            <i tabIndex="1" aria-checked="false" aria-posinset="1" aria-setsize="4" className={destinations[hero].avgRating > 0 ? `active ${rating.one}` : `${rating.one} icon`} role="radio" id={destinations[hero].id}></i>
            <i tabIndex="2" aria-checked="false" aria-posinset="2" aria-setsize="4" className={destinations[hero].avgRating > 1 ? `active ${rating.two}` : `${rating.two} icon`} role="radio" id={destinations[hero].id}></i>
            <i tabIndex="3" aria-checked="true" aria-posinset="3" aria-setsize="4" className={destinations[hero].avgRating > 2 ? `active ${rating.three}` : `${rating.three} icon`} role="radio" id={destinations[hero].id}></i>
            <i tabIndex="4" aria-checked="false" aria-posinset="4" aria-setsize="4" className={destinations[hero].avgRating > 3 ? `active ${rating.four}` : `${rating.four} icon`} role="radio" id={destinations[hero].id}></i>
            <i tabIndex="5" name="radio" aria-checked="false" aria-posinset="5" aria-setsize="5" className={destinations[hero].avgRating > 4 ? `active ${rating.five}` : `${rating.five} icon`} role="radio" id={destinations[hero].id}></i>
          </div>
          <br />
          <Button className="button secondary" onClick={handleInfoButton} name={`${destinations[hero].id}`}>More info</Button>
          <Button className="button secondary" name={destinations[hero].id} onClick={handleMyList}>My List</Button>
        </div>
      </div>
    </div>
  )
}

export default Hero
