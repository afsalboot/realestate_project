import React from 'react'
import "./singlePage.scss"
import Slider from '../../components/slider/Slider'
import {singlePostData, userData} from '../../lib/dummyData'
import {assets} from "../../assets/assets"
import Map from '../../components/map/Map'

const SinglePage = () => {
  return (
    <div className='singlePage'>

      <div className="details">

        <div className="wrapper">

          <Slider images={singlePostData.images}/>

          <div className="info">

            <div className="top">
                <div className="post">
                  <h1>{singlePostData.title}</h1>
                  <div className="address">
                    <img src={assets.pin} alt="" />
                    <span>{singlePostData.address}</span>
                  </div>
                  <div className="price">{singlePostData.price}</div>
                </div>
                <div className="user">
                  <img src={userData.img} alt="" />
                  <span>{userData.name}</span>
                </div>
            </div>

            <div className="bottom">
                {singlePostData.description}
            </div>

          </div>

        </div>

      </div>

      <div className="features">

        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src={assets.utility} alt="" />
              <div className="featureText">
                <span>Utiltties</span>
                <p>Renter is responsible</p>
              </div>
            </div>
            <div className="feature">
              <img src={assets.pet} alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                <p>Pet Allowed</p>
              </div>
            </div>
            <div className="feature">
              <img src={assets.fee} alt="" />
              <div className="featureText">
                <span>Property Fee</span>
                <p>Must have 3x the rent in total household income</p>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
          <div className="size">
              <img src={assets.size} alt="" />
              <span>80sqft</span>
            </div>
            <div className="size">
              <img src={assets.bed} alt="" />
              <span>2 bed</span>
            </div>
            <div className="size">
              <img src={assets.bath} alt="" />
              <span>1 bathroom</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
          <div className="feature">
              <img src={assets.school} alt="" />
              <div className="featureText">
                <span>School</span>
                <p>250m away</p>
              </div>
            </div>
            <div className="feature">
              <img src={assets.bus} alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>100m away</p>
              </div>
            </div>
            <div className="feature">
              <img src={assets.restaurant} alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>200m away</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={singlePostData}/>
          </div>
          <div className="buttons">
            <img src={assets.save} alt="" />
            Save the Place
          </div>
        </div>

      </div>

    </div>
  )
}

export default SinglePage
