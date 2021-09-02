import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_MARKERS_DB } from "../../urls/url";
import Mark from "../Mark/Mark";
import "./Account.css";

const Account = () => {
  // const arr = [{ coords: [55.72242171789997, 37.55932930905152], adress: 'Россия, Москва, улица Хамовнический Вал, 36' }, { coords: [55.76069738614288, 37.64234904248048], adress: 'Россия, Москва, Чистопрудный бульвар, 12к7А' }];
  const [markers, setMarkers] = useState([])
  const [markersValue, setMarkersValue] = useState(0)
  const [flag, setFlag] = useState(null)
  const [allMarkers, setAllMarkers] = useState([])


  const allMarks = useSelector(state => state.marks)

  const allAcceptedMarks = allMarks.filter(el => el.isAccepted === true)

  const allNewMarks = allMarks.filter(el => el.isChecked === false)

  // const newMarks = useSelector(state => state.newMarks)


  // useEffect(() => {
  // axios.get(GET_ALL_MARKERS_DB).then(res => { // gets new markers
  //     setMarkersValue(res.data.count)
  //     setMarkers(res.data.markers)
  //   }, [])

  //   axios.get('http://localhost:3005/all') //gets all markers
  //   .then(res => {
  //     setAllMarkers(res.data)
  //   })
  // }, [])


  const newMarkersHandler = () => {
    setFlag(true)
  }

  const allMarkersHandler = () => {
    setFlag(false)
  }

  // console.log(arr)
  return (
    <>
      <div className="block-wrapper__map">
        <div className='map'>
          <div className='centring'>
            <h3> Выберите </h3>
            <button className='btn btn-success mx-2' onClick={newMarkersHandler}> Новые метки </button>
            <button className='btn btn-success' onClick={allMarkersHandler}> Вывести все метки </button>
          </div>
          {flag ? allNewMarks.map(el => <Mark id={el.id} identificator={true} longitude={el.longitude}
            latitude={el.latitude} adress={el.address} pic={el.pics} key={el.id} />)
            :
            allAcceptedMarks.map(el => <Mark id={el.id} identificator={false} longitude={el.longitude}
              latitude={el.latitude} adress={el.address} pic={el.pics} key={el.id} />)}
        </div>
        <div className='shit' id='infoBlock'>
          <h2>Добро пожаловать в ЛК</h2>
          <p>Admin</p>
          <p>Всего заметок на сайте: {markersValue}</p>
        </div>

      </div>
    </>
  );
};

export default Account;
