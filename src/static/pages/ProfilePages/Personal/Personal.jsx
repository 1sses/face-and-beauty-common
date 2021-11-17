import React, { useContext, useEffect, useState } from 'react'
import { logoutUser } from '../../../api/auth'
import { ReporterContext } from '../../../context/reporter'
import { AuthContext } from '../../../context/auth'
import { useHistory } from 'react-router-dom'
import ImageLoader from '../../../components/ImageLoader'
import style from './Personal.module.scss'
import usePersonalEdit from '../../../hooks/usePersonalEdit'
import Password from '../../../components/UI/Password'
import useInput from '../../../hooks/useInput'
import { changeUserAvatar, changeUserName, changeUserPassword, getPersonalData } from '../../../api/user'
import Button from '../../../components/UI/Button'
import Input from '../../../components/UI/Input'
import { mainPath } from '../../../config/path.config'
import useLoader from '../../../hooks/useLoader'
import useUpdater from '../../../hooks/useUpdater'
import Loader from '../../../Loader'

const Personal = () => {
  const [loader, endLoading, startLoading] = useLoader()
  const [updater, update] = useUpdater()

  const [name, nameInputHandler, nameEdited, nameButtonHandler, nameSignChange] = usePersonalEdit('')
  const [email, emailInputHandler, emailEdited, emailButtonHandler, emailSignChange] = usePersonalEdit('')
  const [avatar, setAvatar] = useState('')
  const [oldPassword, oldPasswordHandler] = useInput('')
  const [newPassword, newPasswordHandler] = useInput('')
  const [croppedImage, setCroppedImage] = useState(null)
  const [imageEdit, setImageEdit] = useState(false)
  const switchImageEdit = () => setImageEdit(!imageEdit)

  const { setAuth } = useContext(AuthContext)
  const reporter = useContext(ReporterContext)
  const history = useHistory()

  const changeName = () => {
    changeUserName({ name })
      .then(res => {
        if (!res.error) {
          reporter.showReporter(res.message, false)
        } else {
          reporter.showReporter(res.error, true)
        }
      })
  }
  const changePassword = () => {
    changeUserPassword({ oldPassword, newPassword })
      .then(res => {
        if (!res.error) {
          oldPasswordHandler({ target: { value: '' } })
          newPasswordHandler({ target: { value: '' } })
          reporter.showReporter(res.message, false)
        } else {
          reporter.showReporter(res.error, true)
        }
      })
  }
  const changeAvatar = () => {
    if (!croppedImage) {
      reporter.showReporter('Пожалуйста, загрузите фото!', true)
      return
    }
    fetch(croppedImage)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], 'avatar.png', { type: 'image/png' })
        const formData = new FormData()
        formData.append('avatar', file, file?.name)
        changeUserAvatar(formData)
          .then(
            res => {
              if (!res.error) {
                reporter.showReporter(res.message, false)
              } else {
                reporter.showReporter(res.error, true)
              }
              update()
            }
          )
          .catch(err => console.log(err))
      })
  }
  const logoutHandler = () => {
    logoutUser()
      .then(
        res => {
          if (!res.error) {
            reporter.showReporter(res.message, false)
            history.push(mainPath.ROOT)
            setAuth('unauth')
          } else {
            reporter.showReporter(res.error, true)
          }
        }
      )
      .catch(err => console.log(err))
  }
  useEffect(() => {
    startLoading()
    getPersonalData()
      .then(res => {
        nameInputHandler({ target: { value: res.name ?? '' } })
        emailInputHandler({ target: { value: res.email } })
        setAvatar(res.avatarUrl)
        endLoading()
      })
      .catch(err => console.log(err))
  }, [updater])
  return (
    <>
      <h2 className={style.header}>Персональный профиль</h2>
      {loader
        ? <Loader />
        : <div className={style.wrapper}>
        <section className={style.profile}>
          <h3>Имя</h3>
          <div className={style.inputBox}>
            <Input type="text" autoComplete="false" disabled={!nameEdited} value={name} onChange={nameInputHandler}/>
            <button onClick={nameButtonHandler}>{nameSignChange()}</button>
          </div>
          <Button onClick={changeName} text="Сохранить имя" confirm={true}/>
          <h3>Email</h3>
          <div className={style.inputBox}>
            <Input type="email" autoComplete="false" disabled={!emailEdited} value={email}
                   onChange={emailInputHandler}/>
            <button onClick={emailButtonHandler}>{emailSignChange()}</button>
          </div>
          <Button text="Сохранить email" confirm={true}/>
          <h3>Пароль</h3>
          <div className={style.passwordBox}>
            <Password placeholder="Старый пароль" value={oldPassword} changeValue={oldPasswordHandler}
                      autoComplete="false"/>
            <Password placeholder="Новый пароль" value={newPassword} changeValue={newPasswordHandler}
                      autoComplete="false"/>
          </div>
          <Button text="Сохранить пароль" confirm={true} onClick={changePassword}/>
          <Button className={style.logout} text="Выйти из профиля" confirm={false} onClick={logoutHandler}/>
        </section>
        <section className={style.avatar}>
          <h3>Фото профиля</h3>
          {!imageEdit && (avatar
            ? <img src={avatar} alt="avatar"/>
            : <i className={`far fa-user-circle ${style.imagePreview}`}/>)}
          {imageEdit && <ImageLoader setImage={setCroppedImage} save={changeAvatar}/>}
          {imageEdit
            ? <button className={style.imageExit} onClick={switchImageEdit}><i className="fas fa-times"/></button>
            : <button className={style.imageEdit} onClick={switchImageEdit}><i className="far fa-edit"/></button>}
        </section>
      </div>}
    </>
  )
}

export default Personal
