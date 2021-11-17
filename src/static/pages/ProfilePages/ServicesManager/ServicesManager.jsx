import React, { useContext, useState } from 'react'
import style from './ServicesManager.module.scss'
import Button from '../../../components/UI/Button'
import Modal from '../../../Modal'
import useInput from '../../../hooks/useInput'
import ServiceEditor from '../../../components/ServiceComponents/ServiceEditor'
import { appendService } from '../../../api/services'
import { ReporterContext } from '../../../context/reporter'
import ServicesList from '../../../components/ServiceComponents/ServicesList'

const ServicesManager = () => {
  const [modal, setModal] = useState(false)
  const openModal = () => setModal(true)
  const closeModal = () => setModal(false)
  const [group, setGroup] = useInput('Женский зал')
  const [category, setCategory] = useInput('')
  const [price, setPrice] = useInput('')
  const [type, setType] = useInput('')
  const reporter = useContext(ReporterContext)
  const saveService = () => {
    if (!group || !category || !type || !price) {
      reporter.showReporter('Пожалуйста, введите все данные!', true)
      return
    }
    appendService(group, category, type, price)
      .then(res => {
        if (!res.error) reporter.showReporter(res.message, false)
        else reporter.showReporter(res.error, true)
      })
      .catch(err => console.log(err))
  }
  return (
    <>
      <h2 className={style.header}>Услуги</h2>
      <div className={style.wrapper}>
        <Button className={style.new} text="Добавить услугу" confirm={true} onClick={openModal}/>
        <Modal visible={modal} setVisible={setModal}>
          <h3>Введите данные новой услуги: </h3>
          <ServiceEditor
            group={group} setGroup={setGroup}
            category={category} setCategory={setCategory}
            type={type} setType={setType}
            price={price} setPrice={setPrice}
            confirm={saveService} cancel={closeModal}
          />
        </Modal>
        <ServicesList />
      </div>
    </>
  )
}

export default ServicesManager
