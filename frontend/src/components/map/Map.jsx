import React from 'react'
import './map.scss'
import { MapContainer, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import Pin from '../pin/Pin'

const Map = ({items}) => {
  console.log("items received in Map:", items, Array.isArray(items));
  return (
    
    <MapContainer center={[9.390132949381439, 76.87826950781694]} zoom={7} scrollWheelZoom={false} className='map'>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    {items?.map(item=>(
      <Pin item={item} key={item.id}/>
    ))}
  </MapContainer>
  )
}

export default Map
