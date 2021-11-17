import React from 'react'
import style from './ContactItem.module.scss'

const ContactItem = ({ link, icon, text }) => {
  return (
    <div className={style.wrapper}>
      <a href={link} target="_blank" rel="noreferrer">{icon}</a>
      <span>{text}</span>
    </div>
  )
}

export default ContactItem
