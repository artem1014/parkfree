import '../../../src/App.css'
import Map from "../YandexMap/Map";
import React from 'react'

const Main = () => {

  return (
    <div className='block-wrapper'>
      <Map />
    </div>
  )
}

export default React.memo(Main)
