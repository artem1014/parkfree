import '../../../src/App.css'
import Map from "../YandexMap/Map";
import React from 'react'

const Main = () => {

  // //подключение Я.карт
  // ymaps.ready(init);

  // function init() {
  //   const map = new ymaps.Map('map', {
  //     center: [55.751570808531376,37.6188314338379],
  //     zoom: 11
  //   })
  // }

  return (
    // <YMaps>
    <div className='block-wrapper'>
      <Map />
      {/* <Map width={'100vw'} height={'80vh'} defaultState={{ center: [55.751570808531376, 37.6188314338379], zoom: 11 }} /> */}
    </div>
    // </YMaps>
  )
}

export default React.memo(Main)
