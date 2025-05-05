import React from 'react'
import "./card.scss"
import {Link} from 'react-router'
import {assets} from '../../assets/assets'

const Card = ({ item }) => {
  return (
    <div className='card'>

      <Link to={`/${item.id}`} className='imageContainer'>

      <img src={item.images} alt="" />

      </Link>

      <div className="textContainer">
        
        <h2 className="title">

          <Link to={`/${item.id}`}>{item.title}</Link>

        </h2>

        <p className="address">
          <img src={assets.pin} alt="" />
          <span>{item.address}</span>
        </p>

        <p className="price">
          ${item.price}
        </p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src={assets.bed} alt="" />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <img src={assets.bath} alt="" />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          <div className="icons">
            <div className="icon">
              <img src={assets.save} alt="" />
            </div>
            <div className="icon">
              <img src={assets.chat} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
