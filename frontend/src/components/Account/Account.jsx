import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_MARKERS_DB } from "../../urls/url";
import Mark from "../Mark/Mark";
import stylesAcc from "./Account.module.css";

const Account = () => {
  const [markers, setMarkers] = useState([]);
  const [markersValue, setMarkersValue] = useState(0);
  const [flag, setFlag] = useState(null);
  const [allMarkers, setAllMarkers] = useState([]);

  const user = useSelector(state => state.user)

  const allMarks = useSelector((state) => state.marks);

  const allAcceptedMarks = allMarks.filter((el) => el.isAccepted === true);

  const allNewMarks = allMarks.filter(el => el.isChecked === false)

  const changeHandler = () => {
    setFlag((prev) => !prev);
  }

  return (
    <div className={stylesAcc.containerAcc}>
      <div className={stylesAcc.wrapper}>
        <div className={stylesAcc.lk_card}>
          <h1>Добро пожаловать, {user.login}</h1>
          <span>Всего меток на сайте: {allAcceptedMarks.length} </span>
          <span>В ожидании решения: {allNewMarks.length} </span>
        </div>

        <h3> Выберите метки </h3>

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
  );
};

export default Account;
