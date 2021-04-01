import React from 'react'
import { Button } from 'semantic-ui-react'

const DetailInfo = ({ detailInfoId, handleInfoButtonClose, handleMyList, handleRating, rating, destinations }) => {
  return (
    <>
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
                    <div className="ui large star rating" role="radiogroup" clearable='true' onClick={handleRating}
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
                    <Button className="button secondary" name={destination.id} onClick={handleMyList}>My List</Button>
                  </div>
                </div>
              )
            }
          })}
        </div>
        :
        <div></div>
      }
    </>
  )
}

export default DetailInfo
