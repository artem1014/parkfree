import "./SendingForm.css";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const SendingForm = ({
  sendForm,
  handleImageUpload,
  imageUploader,
  uploadedImage,
  setFiles,
  files,
}) => {
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
        <img src={file.preview} style={{ width: "100%" }} alt="preview" />
      </div>
    </div>
  ));

  return (
    <form onSubmit={sendForm} className="form">
      <legend className="text-center text-light">Добавьте метку</legend>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="comment"
          name="comment"
        />
      </div>
      {/* 
      <p type="Вставьте изображение">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={imageUploader}
          name="file"
        />
      </p> */}

      <div className="mb-3 draganddrop">
        <div className='dragPic' {...getRootProps()}>
          <img
            className="add"
            src="'images/—Pngtree—plus vector icon_4236965.png"
            alt=""
          />
          <input {...getInputProps()} />
        </div>
      </div>
        <div className="addImages">{images}</div>

      <img className="inpimg" ref={uploadedImage} />

      <button className="button_send">Send Message</button>
      {/* </div> */}
    </form>
  );
};

export default SendingForm;
