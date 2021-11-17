import React, { useContext, useEffect, useState } from 'react'
import style from './CommonPage.module.scss'
import OrderPage1 from '../Page1'
import OrderPage2 from '../Page2'
import useInput from '../../../hooks/useInput'
import { AuthContext } from '../../../context/auth'
import Button from '../../UI/Button'
import { appendAppointmentAuto, appendAppointmentHard } from '../../../api/appointment'
import { ReporterContext } from '../../../context/reporter'

const CommonPage = ({ confirmText, appendHard }) => {
  const [showCommon, setShowCommon] = useState(false)
  const [showPage2, setShowPage2] = useState(false)

  const [group, setGroup] = useInput('')
  const [category, setCategory] = useInput('')
  const [type, setType] = useInput('')

  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState(new Date(0, 0, 0, 0, 0))

  const [serviceId, setServiceId] = useState(0)
  const [servicePrice, setServicePrice] = useState('')

  const { auth } = useContext(AuthContext)
  const reporter = useContext(ReporterContext)
  useEffect(() => {
    if (auth === 'unauth' || auth === 'pending') setShowCommon(false)
    else setShowCommon(true)
  }, [auth])

  const append = () => {
    const editedDate = date.toLocaleDateString()
    const editedTime = time.getHours() + ':' + time.getMinutes() + '0'.repeat(2 - time.getMinutes().toString().length)
    const dateTime = editedDate + '#' + editedTime
    if (editedTime === '0:00') {
      reporter.showReporter('Пожалуйста, выберите корректное время!', true)
      return
    }
    if (appendHard) {
      appendAppointmentHard(serviceId, dateTime)
        .then(res => {
          if (!res.error) reporter.showReporter(res.message, false)
          else reporter.showReporter(res.error, true)
        })
        .catch(err => console.log(err))
    } else {
      appendAppointmentAuto(serviceId, dateTime)
        .then(res => {
          if (!res.error) reporter.showReporter(res.message, false)
          else reporter.showReporter(res.error, true)
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <>
      {auth === 'barber'
        ? <h2 className={style.wrapper}>Онлайн-запись невозможна для парикмахеров! Пожалуйста, совершите запись по телефону</h2>
        : showCommon
          ? <section className={style.wrapper}>
          <h2>Онлайн-запись</h2>
          <section className={style.pages}>
            <OrderPage1
              setShowPage2={setShowPage2}
              group={group} setGroup={setGroup}
              category={category} setCategory={setCategory}
              type={type} setType={setType} setServiceId={setServiceId} setServicePrice={setServicePrice}/>
            {showPage2 && <OrderPage2 date={date} setDate={setDate} time={time} setTime={setTime}/>}
          </section>
          {type && <div className={style.result}>
            <h3>Итого:</h3>
            <span>{category} ({type})</span>
            <h4>{group}</h4>
            <span>Цена: {servicePrice} руб.</span>
            <span>
          Время: {
              date.toLocaleString('default', { day: 'numeric', month: 'short' })
            } в {
              time.getHours()}<sup>{time.getMinutes() + '0'.repeat(2 - time.getMinutes().toString().length)
            }</sup>
        </span>
          </div>}
          {type && <div className={style.buttons}>
            <Button text={confirmText ?? 'Записаться'} confirm={true} onClick={append} />
          </div>}
        </section>
          : <h2 className={style.wrapper}>Войдите в приложение, чтобы сделать онлайн-запись</h2>}
    </>
  )
}

export default CommonPage
