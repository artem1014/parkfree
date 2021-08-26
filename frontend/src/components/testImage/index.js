import React from "react";
import axios from "axios";
import { SEND_FORMS } from "../../urls/url";
import style from "./style.module.css";

const TestImage = () => {
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const sendForm = (e) => {
    e.preventDefault();
    // Получаем все значения из формы по атрибуту name
    const { file } = Object.fromEntries(new FormData(e.target));
    // console.log(file);
    const image = file.name;

    // Эта штука собирает все значения через append и через axios отправляет на back
    let bodyFormData = new FormData();
    bodyFormData.append("file", file);
    bodyFormData.append("image", image);

    axios({
      method: "post",
      url: SEND_FORMS,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  return (
    <form onSubmit={sendForm}>
      <div className={style.div}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={imageUploader}
          style={{
            display: "none",
          }}
          name="file"
        />
        <div
          style={{
            height: "100px",
            width: "100px",
            border: "1px dashed black",
          }}
          onClick={() => imageUploader.current.click()}
        >
          <img
            ref={uploadedImage}
            style={{
              width: "100px",
              // height: "100px",
              // position: "absolute"
            }}
          />
        </div>
      </div>
      <button>Send</button>
    </form>
  );
};

export default TestImage;
