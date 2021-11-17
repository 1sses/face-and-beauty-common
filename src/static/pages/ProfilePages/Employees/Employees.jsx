import React, { useContext, useState } from 'react'
import style from './Employees.module.scss'
import Modal from '../../../Modal'
import useInput from '../../../hooks/useInput'
import Button from '../../../components/UI/Button'
import EmployeeEditor from '../../../components/TeamComponents/EmployeeEditor'
import { ReporterContext } from '../../../context/reporter'
import { appendNewEmployee } from '../../../api/employee'
import EmployeeManagementPanel from '../../../components/TeamComponents/EmployeeManagementPanel'

const Employees = () => {
  const [modal, setModal] = useState(false)
  const openModal = () => setModal(true)
  const closeModal = () => setModal(false)

  const [name, setName] = useInput('')
  const [position, setPosition] = useInput('')
  const [email, setEmail] = useInput('')
  const [role, setRole] = useInput('barber')
  const [photo, setPhoto] = useState(null)

  const reporter = useContext(ReporterContext)

  const addEmployee = () => {
    if (!name || !position || !email || !role || !photo) {
      reporter.showReporter('Пожалуйста, заполните все поля!', true)
      return
    }
    const formData = new FormData()
    formData.append('employee', photo, photo.name)
    formData.append('data', JSON.stringify({
      name, position, email, role
    }))
    appendNewEmployee(formData)
      .then(res => {
        if (!res.error) {
          reporter.showReporter(res.message, false)
        } else {
          reporter.showReporter(res.error, true)
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <h2 className={style.header}>Сотрудники</h2>
      <div className={style.wrapper}>
        <Button className={style.new} text="Добавить сотрудника" confirm={true} onClick={openModal} />
        <Modal visible={modal} setVisible={setModal}>
          <h3>Введите данные нового сотрудника: </h3>
          <EmployeeEditor
            name={name} setName={setName}
            position={position} setPosition={setPosition}
            email={email} setEmail={setEmail}
            role={role} setRole={setRole}
            photo={photo} setPhoto={setPhoto}
            confirm={addEmployee} cancel={closeModal}
          />
        </Modal>
        <EmployeeManagementPanel />
      </div>
    </>
  )
}

export default Employees
