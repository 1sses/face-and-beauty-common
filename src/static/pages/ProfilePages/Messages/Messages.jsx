import React, { useContext, useEffect, useState } from 'react'
import style from './Messages.module.scss'
import { deleteMessage, getMessages } from '../../../api/message'
import MessageItem from '../../../components/ContactsComponents/MessageItem'
import { ReporterContext } from '../../../context/reporter'
import useLoader from '../../../hooks/useLoader'
import useUpdater from '../../../hooks/useUpdater'
import Loader from '../../../Loader'

const Messages = () => {
  const [loader, endLoading, startLoading] = useLoader()
  const [updater, update] = useUpdater()

  const [messages, setMessages] = useState([])
  const reporter = useContext(ReporterContext)
  useEffect(() => {
    startLoading()
    getMessages()
      .then(res => {
        setMessages(res)
        endLoading()
      })
      .catch(err => console.log(err))
  }, [updater])

  const del = (id) => {
    deleteMessage({ id })
      .then(res => {
        if (!res.error) reporter.showReporter(res.message, false)
        else reporter.showReporter(res.error, true)
        update()
      })
      .catch(err => console.log(err))
  }
  return (
    <>
      <h2 className={style.header}>Сообщения</h2>
      {loader
        ? <Loader />
        : <section className={style.wrapper}>
        {messages.map(message => <MessageItem key={message.id} message={message} del={del}/>)}
      </section>}
    </>
  )
}

export default Messages
