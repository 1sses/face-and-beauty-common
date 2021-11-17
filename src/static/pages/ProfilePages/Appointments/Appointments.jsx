import React, { useContext, useEffect, useState } from 'react'
import style from './Appointments.module.scss'
import Modal from '../../../Modal'
import Button from '../../../components/UI/Button'
import EmployeeOrder from '../../../components/TeamComponents/EmployeeOrder'
import { ReporterContext } from '../../../context/reporter'
import { deleteEmployeeOrder, getUserOrders } from '../../../api/appointment'
import CommonPage from '../../../components/NewOrderPages/CommonPage'
import { AuthContext } from '../../../context/auth'
import useLoader from '../../../hooks/useLoader'
import useUpdater from '../../../hooks/useUpdater'
import Loader from '../../../Loader'

const Appointments = () => {
  const [loader, endLoading, startLoading] = useLoader()
  const [updater, update] = useUpdater()

  const [modal, setModal] = useState(false)
  const openModal = () => setModal(true)
  const closeModal = () => setModal(false)
  const [modalContent, setModalContent] = useState('addOrder')

  const [appointments, setAppointments] = useState([])
  const [deletedId, setDeletedId] = useState(0)
  const reporter = useContext(ReporterContext)
  const { auth } = useContext(AuthContext)

  useEffect(() => {
    startLoading()
    getUserOrders()
      .then(res => {
        const toMs = (x) => {
          const date = x.time.split('#')[0].split('.')
          const time = x.time.split('#')[1].split(':')
          return new Date(+date[2], +date[1], +date[0], +time[0], +time[1])
        }
        if (!res.error) setAppointments(res.sort((a, b) => toMs(a) - toMs(b)))
        endLoading()
      })
      .catch(err => console.log(err))
  }, [updater])

  const delOrder = () => {
    deleteEmployeeOrder(deletedId)
      .then(res => {
        if (!res.error) reporter.showReporter(res.message, false)
        else reporter.showReporter(res.error, true)
        update()
      })
      .catch(err => console.log(err))
  }

  const newOrderHandler = () => {
    setModalContent('addOrder')
    openModal()
  }

  return (
    <>
      <h2 className={style.header}>Записи</h2>
      {loader
        ? <Loader />
        : <div className={style.wrapper}>
        {auth === 'admin' &&
        <Button text="Добавить запись" confirm={true} onClick={newOrderHandler} className={style.new}/>}
        <Modal visible={modal} setVisible={setModal}>
          {modalContent === 'delOrder'
            ? <div className={style.delete}>
              <h3>Вы уверены, что хотите удалить заказ?</h3>
              <Button text="Удалить" confirm={true} onClick={delOrder}/>
              <Button text="Отменить" confirm={false} onClick={closeModal}/>
            </div>
            : <CommonPage confirmText="Добавить запись" appendHard={true}/>}
        </Modal>
        {appointments.length
          ? appointments.map(order =>
            <EmployeeOrder
              key={order.id}
              order={order}
              setModal={setModal}
              setId={setDeletedId}
              setModalContent={setModalContent}
            />)
          : <h3>Записей нет!</h3>}
      </div>}
    </>
  )
}

export default Appointments
