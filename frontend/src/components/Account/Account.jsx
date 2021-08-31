import Mark from "../Mark/Mark";
import style from "./Account.css";

const Account = () => {
  const arr = [
    {
      coords: [55.72242171789997, 37.55932930905152],
      adress: "Россия, Москва, улица Хамовнический Вал, 36",
    },
    {
      coords: [55.76069738614288, 37.64234904248048],
      adress: "Россия, Москва, Чистопрудный бульвар, 12к7А",
    },
  ];
  console.log(arr);
  return (
    <>
      <div style={style.container}>
        <div style={style.wrapper}>
          <div id="gradient"></div>
          <div id="card">
            <img src="https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/9c33caef-be28-4257-b7ed-a407698f1a32/280x420" />
            <h2>Добро пожаловать в ЛК</h2>
            <p>Admin</p>
            <p>Всего заметок на сайте: 52</p>
          </div>
          <div id="infoBlock">
            <h3> Новые заметки </h3>
            {arr.map((el) => (
              <Mark id={el.id} coords={el.coords} adress={el.adress} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
