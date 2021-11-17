import React from 'react'
import style from './EmployeeCard.module.scss'

const EmployeeCard = ({ employee }) => {
  return (
    <div className={style.wrapper}>
      <img src={employee.photo} className={style.image} alt="тут должно быть фото"/>
      <span className={style.name}>{employee.name}</span>
      <span className={style.position}>{employee.position}</span>
    </div>
  )
}

export default EmployeeCard
