import './SendingForm.css'
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";


const SendingForm = ({ sendForm, handleImageUpload, imageUploader, uploadedImage, setFiles, files }) => {
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

  return (

    <form onSubmit={sendForm} className="form">
      <h5>Добавить метку</h5>
      <p type="Добавьте комментарий">
        <input type="text"
          placholder='comment'
          name="comment"
        />
      </p>

      {/* <p type="Вставьте изображение">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={imageUploader}
          name="file"
        />
      </p> */}

      <div>
        <div className='formAddImage' {...getRootProps()}>
          <img
            className='add'
            src="'images/—Pngtree—plus vector icon_4236965.png"
            alt=""
          />
          <input {...getInputProps()} />
          <p>Add minimum 1 photo</p>
        </div>
        <div className='addImages'>{images}</div>
      </div>

      <img className='inpimg'
        ref={uploadedImage}
      />


      <button>Send Message</button>
      {/* </div> */}
    </form>

  )
}

export default SendingForm
