import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_MARKERS_DB } from "../../urls/url";
import Mark from "../Mark/Mark";
import stylesAcc from "./Account.module.css";

const Account = () => {
  // const arr = [{ coords: [55.72242171789997, 37.55932930905152], adress: 'Россия, Москва, улица Хамовнический Вал, 36' }, { coords: [55.76069738614288, 37.64234904248048], adress: 'Россия, Москва, Чистопрудный бульвар, 12к7А' }];
  const [markers, setMarkers] = useState([]);
  const [markersValue, setMarkersValue] = useState(0);
  const [flag, setFlag] = useState(null);
  const [allMarkers, setAllMarkers] = useState([]);

  const user = useSelector(state => state.user)

  const allMarks = useSelector((state) => state.marks);

  const allAcceptedMarks = allMarks.filter((el) => el.isAccepted === true);

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

  // const newMarkersHandler = () => {
  //   setFlag(true);
  // };

  // const allMarkersHandler = () => {
  //   setFlag(false);
  // };

  const changeHandler = () => {
    setFlag((prev) => !prev);
  }

  return (
    <div className={stylesAcc.containerAcc}>
      <div className={stylesAcc.wrapper}>
        {/* <div className="block-wrapper__map"> */}
        {/* <div className="map"> */}
        {/* <div className="centring"> */}












        {/* <div className="shit" id="infoBlock"> */}
        <div className={stylesAcc.lk_card}>
          <h1>Добро пожаловать, {user.login}</h1>
          <span>Всего меток на сайте: {allAcceptedMarks.length} </span>
          <span>В ожидании решения: {allNewMarks.length} </span>
        </div>

        <h3> Выберите действие </h3>
        {/* <button className={stylesAcc.button_marks} onClick={newMarkersHandler}>

          Новые метки
        </button>
        <button className={stylesAcc.button_marks} onClick={allMarkersHandler}>

          Вывести все метки
        </button> */}

        <input className={stylesAcc.input} onChange={changeHandler} type="checkbox" name="switch" id="switch" />
        <label className={stylesAcc.label} for="switch">
          <span className={stylesAcc.labelText}>{flag ? 'Новые' : 'Все'}</span></label>

        {/* </div> */}
        <div className='d-flex justify-content-center'>
          <div className={stylesAcc.table}>

            {flag
              ? allNewMarks.map((el) => (
                <Mark
                  id={el.id}
                  identificator={true}
                  longitude={el.longitude}
                  latitude={el.latitude}
                  adress={el.address}
                  pic={el.pics}
                  key={el.id}
                />
              ))
              : allAcceptedMarks.map((el) => (
                <Mark
                  id={el.id}
                  identificator={false}
                  longitude={el.longitude}
                  latitude={el.latitude}
                  adress={el.address}
                  pic={el.pics}
                  key={el.id}
                />
              ))}

          </div>
        </div>
      </div>
    </div>
    // </div>
    // </div>
  );
};

export default Account;
