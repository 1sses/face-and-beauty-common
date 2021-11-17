import React, { useState } from 'react'
import style from './ImageLoader.module.scss'
import Avatar from 'react-avatar-edit'
import Button from '../UI/Button'

const ImageLoader = ({ setImage, save }) => {
  const [loaded, setLoaded] = useState(null)
  const imageHandler = (preview) => setImage(preview)
  return (
    <div className={style.imageLoader}>
      <Avatar
        width={200}
        height={200}
        imageWidth={200}
        label=<i className="far fa-file-image" />
        labelStyle={{ fontSize: '100px', cursor: 'pointer' }}
        onImageLoad={(elem) => setLoaded(elem.target.files[0])}
        onCrop={imageHandler}
        img={loaded}
        exportSize={500}
        exportQuality={1.0}
      />
      <div className={style.buttonContainer}>
        <Button onClick={save} className={style.confirm} text="Сохранить фото" confirm={true} />
      </div>
    </div>
  )
}

export default ImageLoader
