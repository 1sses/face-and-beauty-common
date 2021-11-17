import React from 'react'
import style from './MessageItem.module.scss'

const MessageItem = ({ message, del }) => {
  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <h3>{message.email} - {message.name}</h3>
        <p className={style.date}>{new Date(message.createdAt).toLocaleString()}</p>
        <p>{message.message}</p>
      </div>
      <div className={style.buttons}>
        <button onClick={del.bind(null, message.id)}><i className="far fa-trash-alt" /></button>
      </div>
    </div>
  )
}

export default MessageItem
