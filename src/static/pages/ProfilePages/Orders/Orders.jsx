import React, { useContext, useEffect, useState } from 'react'
import style from './Orders.module.scss'
import Button from '../../../components/UI/Button'
import Modal from '../../../Modal'
import { ReporterContext } from '../../../context/reporter'
import { deleteEmployeeOrder, getEmployeeOrders } from '../../../api/appointment'
import EmployeeOrder from '../../../components/TeamComponents/EmployeeOrder'
import useLoader from '../../../hooks/useLoader'
import useUpdater from '../../../hooks/useUpdater'
import Loader from '../../../Loader'

const Orders = () => {
  const [loader, endLoading, startLoading] = useLoader()
  const [updater, update] = useUpdater()

  const [modal, setModal] = useState(false)
  // const openModal = () => setModal(true)
  const closeModal = () => setModal(false)

  const [orders, setOrders] = useState([])
  const [deletedId, setDeletedId] = useState(0)
  const reporter = useContext(ReporterContext)

  useEffect(() => {
    startLoading()
    getEmployeeOrders(null, 'barber')
      .then(res => {
        const toMs = (x) => {
          const date = x.time.split('#')[0].split('.')
          const time = x.time.split('#')[1].split(':')
          return new Date(+date[2], +date[1], +date[0], +time[0], +time[1])
        }
        if (!res.error) setOrders(res.sort((a, b) => toMs(a) - toMs(b)))
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

  return (
    <>
      <h2 className={style.header}>Заказы</h2>
      {loader
        ? <Loader />
        : <div className={style.wrapper}>
        <Modal visible={modal} setVisible={setModal}>
          <div className={style.delete}>
            <h3>Вы уверены, что хотите удалить заказ?</h3>
            <Button text="Удалить" confirm={true} onClick={delOrder}/>
            <Button text="Отменить" confirm={false} onClick={closeModal}/>
          </div>
        </Modal>
        {orders.map(order =>
          <EmployeeOrder
            key={order.id}
            order={order}
            setModal={setModal}
            setId={setDeletedId}
            setModalContent={() => {}}
          />)}
      </div>}
    </>
  )
}

export default Orders
