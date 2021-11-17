import React from 'react'
import style from './EmployeeOrder.module.scss'
import Button from '../../UI/Button'

const EmployeeOrder = ({ order, setId, setModal, setModalContent }) => {
  const del = () => {
    setId(order.id)
    setModalContent('delOrder')
    setModal(true)
  }
  return (
    <div className={style.wrapper}>
      <span>{order.time.split('#').join(' в ')}</span>
      <span>{order.Service.group} - {order.Service.category} - {order.Service.type}</span>
      <Button text="Удалить" confirm={false} onClick={del} />
    </div>
  )
}

export default EmployeeOrder
