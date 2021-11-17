import React, { useMemo, useRef, useState } from 'react'
import style from './EmployeeEditor.module.scss'
import Input from '../../UI/Input'
import Button from '../../UI/Button'
import EmployeeCard from '../EmployeeCard'

const EmployeeEditor = ({
  name, setName, position, setPosition, email, setEmail, role, setRole, photo, setPhoto, confirm, cancel
}) => {
  function getBase64 (file) {
    if (file) {
      if (file instanceof Blob) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
          setPreviewImage(reader.result)
        }
        reader.onerror = function (error) {
          console.log('Error: ', error)
        }
      } else setPreviewImage(photo)
    }
  }
  const imageRef = useRef()
  const loadImage = () => imageRef.current.click()
  const imageChangeHandler = () => setPhoto(imageRef.current?.files[0])
  const [previewImage, setPreviewImage] = useState(photo)
  const employee = { name, position, photo: previewImage }
  useMemo(() => getBase64(photo), [photo])
  return (
    <>
      <section className={style.wrapper}>
        <div className={style.constructor}>
          <Input value={name} onChange={setName} placeholder="Введите имя" />
          <Input value={position} onChange={setPosition} placeholder="Введите должность" />
          <Input value={email} onChange={setEmail} placeholder="Введите email" />
          <select value={role} onChange={setRole}>
            <option value="barber">Парикмахер</option>
            <option value="admin">Администратор</option>
          </select>
          <div className={style.imageLoader}>
            <div className={style.imageSelector} title="Загрузить фото" onClick={loadImage}>
              <i className="far fa-file-image"/>
              <input type="file" ref={imageRef} onChange={imageChangeHandler}/>
            </div>
            <span>{photo ? photo.name : 'Фото не выбрано'}</span>
          </div>
          <div className={style.buttons}>
            <Button text="Сохранить" confirm={true} onClick={confirm} />
            <Button text="Отменить" confirm={false} onClick={cancel} />
          </div>
        </div>
        <div className={style.preview}>
          <EmployeeCard employee={employee} />
        </div>
      </section>
    </>
  )
}

export default EmployeeEditor
