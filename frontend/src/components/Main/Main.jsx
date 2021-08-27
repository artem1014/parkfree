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
      <h2>Отметьте на карте бесплатные слоты в центре Москвы</h2>
      <div>
        <Map />
        {/* <Map width={'100vw'} height={'80vh'} defaultState={{ center: [55.751570808531376, 37.6188314338379], zoom: 11 }} /> */}
      </div>
    </div>
    // </YMaps>
  )
}

export default React.memo(Main)
