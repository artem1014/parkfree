import { addNotification } from "../../redux/actions/notificationAC";
import { useDropzone } from "react-dropzone";
import { SEND_FORMS } from "../../urls/url";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import style from "./style.module.css";
import axios from "axios";

function TestImage() {
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles((prevFiles) => [
        ...prevFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    },
  });

  const images = files.map((file) => (
    <div key={file.name}>
      <div>
        <img src={file.preview} style={{ width: "200px" }} alt="preview" />
      </div>
    </div>
  ));

  const sendForm = (e) => {
    e.preventDefault();
    // Получаем все значения из формы по атрибуту name
    const { text } = Object.fromEntries(new FormData(e.target));
    // Эта штука собирает все значения через append и через axios отправляет на back
    if (text.trim()) {
      let bodyFormData = new FormData();
      files.map((el) => {
        bodyFormData.append("files", el);
        bodyFormData.append("images", el.name);
      });
      bodyFormData.append("text", text);

      axios({
        method: "post",
        url: SEND_FORMS,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((res) => dispatch(addNotification(res.data)));
    }
  };

  return (
    <form className={style.formForMarker} onSubmit={sendForm}>
      <h1>Send marker</h1>
      <input placeholder="text" name="text" />
      <div>
        <div className={style.formAddImage} {...getRootProps()}>
          <img
            className={style.add}
            src="./images/—Pngtree—plus vector icon_4236965.png"
          />
          <input {...getInputProps()} />
          {/* <p>Add minimum 1 photo</p> */}
        </div>
        <div>{images}</div>
      </div>
      <button>Send</button>
    </form>
  );
}

export default TestImage;
