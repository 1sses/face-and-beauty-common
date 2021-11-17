import React, { useEffect, useState } from 'react'
import style from './OrderPage2.module.scss'

import AdapterDateFns from '@mui/lab/AdapterDateFns'
import ruLocale from 'date-fns/locale/ru'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import StaticDatePicker from '@mui/lab/StaticDatePicker'
import { StaticTimePicker } from '@mui/lab'
import 'react-calendar/dist/Calendar.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { getCurrentAppointments } from '../../../api/appointment'

export const themeOptions = createTheme({
  typography: {
    fontSize: 8
  }
})

const OrderPage2 = ({ date, setDate, time, setTime }) => {
  const [appointments, setAppointments] = useState([])
  const [employeeCount, setEmployeeCount] = useState(0)

  const [dateAppointments, setDateAppointments] = useState([])

  const disableChecker = (timeValue, clockType) => {
    if (clockType === 'hours') {
      if (dateAppointments.reduce((acc, order) => {
        const houred = order.time.split('#')[1].split(':')[0]
        if (+houred === timeValue) return acc + 1
        else return acc
      }, 0) >= employeeCount * 2) return true
    }
    if (clockType === 'minutes') {
      if (timeValue % 30 !== 0) return true
      const hours = time.getHours()
      if (dateAppointments
        .filter(order => order.time.split('#')[1] === `${hours}:${timeValue}`)
        .length >= employeeCount) return true
    }
  }

  useEffect(() => {
    getCurrentAppointments()
      .then(res => {
        if (!res.error) {
          setAppointments(res.appointments)
          setEmployeeCount(res.employeeCount)
        }
      })
      .catch(err => console.log(err))
  }, [])
  useEffect(() => {
    setTime(new Date(0, 0, 0, 0, 0))
    setDateAppointments(appointments.filter(order => order.time.split('#')[0] === date.toLocaleDateString()))
  }, [date])

  return (
    <div className={style.wrapper}>
      <ThemeProvider theme={themeOptions}>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
          <StaticDatePicker
            label="Выберите дату"
            openTo="day"
            value={date}
            onChange={(newValue) => setDate(newValue)}
            minDate={Date.now()}
            maxDate={Date.now() + 15 * 24 * 60 * 60 * 1000}
            renderInput={(params) => null}
          />
          <StaticTimePicker
            label="Выберите время"
            onChange={(newTime) => setTime(newTime)}
            value={time}
            minTime={new Date(0, 0, 0, 9)}
            maxTime={new Date(0, 0, 0, 21, 30)}
            minutesStep={30}
            renderInput={(params) => null}
            shouldDisableTime={disableChecker}
          />
        </LocalizationProvider>
      </ThemeProvider>
    </div>
  )
}

export default OrderPage2
