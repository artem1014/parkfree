import { useEffect, useState } from "react";
import './YandexMap.css'
import init from "../YandexMap/ymaps";

const YandexMap = () => {

  const [myPlacemark, setMyPlacemark] = useState([])




  
  useEffect(() => {
    window.ymaps.ready(() => init());
  }, []);

  return (
    <>


      <button> Отправить метку на согласование </button>
    </>
  )
}

export default YandexMap;
