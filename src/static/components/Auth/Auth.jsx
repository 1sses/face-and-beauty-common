import React from 'react'
import style from './Auth.module.scss'
import logo from '../../images/logo.png'

const Auth = ({ children }) => {
  return (
    <main className={style.wrapper}>
      <img src={logo} alt="logo" />
      {children}
    </main>
  )
}

export default Auth
