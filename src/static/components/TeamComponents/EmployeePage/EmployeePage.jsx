import React, { useContext, useEffect, useState } from 'react'
import style from './EmployeePage.module.scss'
import { useHistory, useParams } from 'react-router-dom'
import { deleteEmployee, getEmployeeById, updateEmployeeInfo } from '../../../api/employee'
import EmployeeEditor from '../EmployeeEditor'
import useInput from '../../../hooks/useInput'
import { ReporterContext } from '../../../context/reporter'
import Modal from '../../../Modal'
import Button from '../../UI/Button'
import { deleteEmployeeOrder, getEmployeeOrders } from '../../../api/appointment'
import EmployeeOrder from '../EmployeeOrder'

const EmployeePage = () => {
  const [name, setName] = useInput('')
  const [position, setPosition] = useInput('')
  const [email, setEmail] = useInput('')
  const [role, setRole] = useInput('barber')
  const [photo, setPhoto] = useState(null)
  const [initPhoto, setInitPhoto] = useState(null)
  const [orders, setOrders] = useState([])
  const [orderDeleteId, setOrderDeleteId] = useState(0)

  const [modal, setModal] = useState(false)
  const openModal = () => setModal(true)
  const closeModal = () => setModal(false)
  const [modalContent, setModalContent] = useState('delEmployee')

  const reporter = useContext(ReporterContext)
  const history = useHistory()
  const params = useParams()
  useEffect(() => {
    getEmployeeById(+params.id)
      .then(res => {
        setName({ target: { value: res.name } })
        setPosition({ target: { value: res.position } })
        setEmail({ target: { value: res.email } })
        setRole({ target: { value: res.role } })
        setPhoto(res.photo)
        setInitPhoto(res.photo)
      })
    getEmployeeOrders(+params.id, 'admin')
      .then(res => {
        const toMs = (x) => {
          const date = x.time.split('#')[0].split('.')
          const time = x.time.split('#')[1].split(':')
          return new Date(+date[2], +date[1], +date[0], +time[0], +time[1])
        }
        if (!res.error) setOrders(res.sort((a, b) => toMs(a) - toMs(b)))
      })
      .catch(err => console.log(err))
  }, [])
  const deleteEmployeeHandler = () => {
    setModalContent('delEmployee')
    openModal()
  }
  const saveData = () => {
    if (!name || !position || !email || !role || !photo) {
      reporter.showReporter('Пожалуйста, заполните все поля!', true)
      return
    }
    const formData = new FormData()
    formData.append('data', JSON.stringify({
      id: +params.id, name, position, email, role
    }))
    if (initPhoto !== photo) formData.append('employee', photo, photo.name)
    updateEmployeeInfo(formData)
      .then(res => {
        if (!res.error) {
          reporter.showReporter(res.message, false)
        } else {
          reporter.showReporter(res.error, true)
        }
      })
      .catch(err => console.log(err))
  }
  const del = () => {
    deleteEmployee({ id: +params.id, email })
      .then(res => {
        if (!res.error) {
          reporter.showReporter(res.message, false)
          history.push('/profile/employees')
        } else {
          reporter.showReporter(res.error, true)
        }
      })
      .catch(err => console.log(err))
  }
  const cancelChanges = () => history.goBack()
  const delOrder = () => {
    deleteEmployeeOrder(orderDeleteId)
      .then(res => {
        if (!res.error) reporter.showReporter(res.message, false)
        else reporter.showReporter(res.error, true)
      })
      .catch(err => console.log(err))
  }
  return (
    <section className={style.wrapper}>
      <Modal visible={modal} setVisible={setModal}>
        {modalContent === 'delOrder'
          ? <div className={style.delete}>
          <h3>Вы уверены, что хотите удалить заказ?</h3>
          <Button text="Удалить" confirm={true} onClick={delOrder}/>
          <Button text="Отменить" confirm={false} onClick={closeModal}/>
        </div>
          : <div className={style.delete}>
          <h3>Вы уверены, что хотите удалить сотрудника?</h3>
          <Button text="Удалить" confirm={true} onClick={del} />
          <Button text="Отменить" confirm={false} onClick={closeModal} />
          </div>}
      </Modal>
      <h3>Информация о сотруднике:</h3>
      {!email
        ? 'Сотрудника с таким id нет!'
        : <div>
          <EmployeeEditor
            name={name} setName={setName}
            position={position} setPosition={setPosition}
            email={email} setEmail={() => {}}
            role={role} setRole={setRole}
            photo={photo} setPhoto={setPhoto}
            confirm={saveData} cancel={cancelChanges}
          />
          <section className={style.orders}>
            <h3>Заказы сотрудника:</h3>
            {orders.map(order =>
              <EmployeeOrder
                key={order.id}
                order={order}
                setId={setOrderDeleteId}
                setModal={setModal}
                setModalContent={setModalContent}
              />)}
          </section>
          <Button text="Удалить" confirm={false} onClick={deleteEmployeeHandler} />
        </div>}
    </section>
  )
}

export default EmployeePage
