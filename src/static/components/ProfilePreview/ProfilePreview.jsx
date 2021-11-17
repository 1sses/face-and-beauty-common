import React, { useContext, useEffect, useState } from 'react'
import style from './ProfilePreview.module.scss'
import { AuthContext } from '../../context/auth'
import { getPersonalData } from '../../api/user'

const ProfilePreview = () => {
  const [avatar, setAvatar] = useState('')
  const { auth } = useContext(AuthContext)
  useEffect(() => {
    getPersonalData()
      .then(res => {
        if (!res.error) setAvatar(res.avatarUrl)
        else setAvatar('')
      })
      .catch(err => console.log(err))
  }, [auth])
  return (
    <div className={style.wrapper} title="Профиль">
      {avatar ? <img src={avatar} alt="avatar"/> : <i className="far fa-user-circle" />}
    </div>
  )
}

export default ProfilePreview
