import './SendingForm.css'

const SendingForm = ({ sendForm, handleImageUpload, imageUploader, uploadedImage }) => {
  return (

    <form onSubmit={sendForm} class="form">
      <h5>Добавить метку</h5>
      <p type="Добавьте комментарий">
        <input type="text"
          placholder='comment'
          name="comment"
        />
      </p>

      <p type="Вставьте изображение">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={imageUploader}
          name="file"
        />
      </p>


      {/* <div className='div'
        onClick={() => imageUploader.current.click()}
      > */}

      <img
        ref={uploadedImage}
      />


      <button>Send Message</button>
      {/* </div> */}
    </form>

  )
}

export default SendingForm
