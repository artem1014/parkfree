import axios from 'axios'
import { useEffect, useState } from 'react'
import { GET_ALL_MARKERS_DB } from '../../urls/url'
import Mark from '../Mark/Mark'
import './Account.css'

const Account = () => {
  // const arr = [{ coords: [55.72242171789997, 37.55932930905152], adress: 'Россия, Москва, улица Хамовнический Вал, 36' }, { coords: [55.76069738614288, 37.64234904248048], adress: 'Россия, Москва, Чистопрудный бульвар, 12к7А' }];
  const [markers, setMarkers] = useState([])
  const [markersValue, setMarkersValue] = useState(0)

  useEffect(() => {
    axios.get(GET_ALL_MARKERS_DB).then(res => {
      setMarkersValue(res.data.count)
      setMarkers(res.data.markers)
    })
  }, [markers])

  // console.log(arr)
  return (
    <>
      <div id="gradient"></div>
      <div id="card">
        <img src="https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/9c33caef-be28-4257-b7ed-a407698f1a32/280x420" alt="" />
        <h2>Добро пожаловать в ЛК</h2>
        <p>Admin</p>
        <p>Всего заметок на сайте: {markersValue}</p>
      </div>
      <div id="infoBlock">
        <h3> Новые заметки </h3>
          {markers.map(el => <Mark id={el.id} longitude={el.longitude}
    latitude={el.latitude} adress={el.address} key={el.id}/>)}
      </div>
    </>
  );
};

export default Account;
