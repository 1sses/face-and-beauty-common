import React, { useContext, useEffect, useState } from 'react'
import style from './ServicesList.module.scss'
import { deleteService, getAllServices, updateService } from '../../../api/services'
import Modal from '../../../Modal'
import ServiceEditor from '../ServiceEditor'
import useInput from '../../../hooks/useInput'
import { ReporterContext } from '../../../context/reporter'
import Button from '../../UI/Button'
import useLoader from '../../../hooks/useLoader'
import useUpdater from '../../../hooks/useUpdater'
import Loader from '../../../Loader'

const groups = ['Женский зал', 'Мужской зал', 'Детский зал', 'Окрашивание', 'Косметический зал', 'Маникюрный зал', 'Зал бровей']

const ServicesList = () => {
  const [loader, endLoading, startLoading] = useLoader()
  const [updater, updateFn] = useUpdater()

  const [services, setServices] = useState([])

  const [modal, setModal] = useState(false)
  const openModal = () => setModal(true)
  const closeModal = () => setModal(false)
  const [modalContent, setModalContent] = useState('')

  const [group, setGroup] = useInput('Женский зал')
  const [category, setCategory] = useInput('')
  const [price, setPrice] = useInput('')
  const [type, setType] = useInput('')
  const [id, setId] = useState(0)

  const reporter = useContext(ReporterContext)

  useEffect(() => {
    startLoading()
    getAllServices()
      .then(res => {
        if (!res.error) setServices(res)
        endLoading()
      })
      .catch(err => console.log(err))
  }, [updater])
  const updateModalHandler = (group, category, type, price, id) => {
    setModalContent('update')
    setGroup({ target: { value: group } })
    setCategory({ target: { value: category } })
    setType({ target: { value: type } })
    setPrice({ target: { value: price } })
    setId(id)
    openModal()
  }
  const update = () => {
    if (!group || !category || !type || !price) {
      reporter.showReporter('Пожалуйста, введите все данные!', true)
      return
    }
    updateService(id, group, category, type, price)
      .then(res => {
        if (!res.error) reporter.showReporter(res.message, false)
        else reporter.showReporter(res.error, true)
        updateFn()
      })
      .catch(err => console.log(err))
  }
  const deleteModalHandler = (id) => {
    setModalContent('delete')
    setId(id)
    openModal()
  }
  const del = () => {
    deleteService(id)
      .then(res => {
        if (!res.error) reporter.showReporter(res.message, false)
        else reporter.showReporter(res.error, true)
        updateFn()
      })
      .catch(err => console.log(err))
  }
  return (
    <section className={style.wrapper}>
      <Modal visible={modal} setVisible={setModal}>
        {modalContent === 'update'
          ? <div className={style.editor}>
            <h3>Обновление данных услуги:</h3>
            <ServiceEditor
              group={group} setGroup={setGroup}
              category={category} setCategory={setCategory}
              type={type} setType={setType}
              price={price} setPrice={setPrice}
              confirm={update} cancel={closeModal}
            />
          </div>
          : <div className={style.delete}>
            <h3>Вы действительно хотите удалить услугу?</h3>
            <Button text="Удалить" confirm={true} onClick={del} />
            <Button text="Назад" confirm={false} onClick={closeModal} />
          </div>}
      </Modal>
      {loader
        ? <Loader />
        : services.map((group, i) =>
        <div key={i} className={style.group}>
          <h2>{groups.at(i)}</h2>
          {group.map((service, j) =>
            <div key={j} className={style.category}>
              <h3>{service.name}</h3>
              {service.types.map((type, k) =>
                <div key={k} className={style.service}>
                  <span>{type.type} - {type.price} руб.</span>
                  <div className={style.buttons}>
                    <button
                      onClick={updateModalHandler.bind(null, groups.at(i), service.name, type.type, type.price, type.id)}
                    ><i className="fas fa-pencil-alt" /></button>
                    <button onClick={deleteModalHandler.bind(null, type.id)}><i className="far fa-trash-alt" /></button>
                  </div>
                </div>)}
            </div>
          )}
        </div>)}
    </section>
  )
}

export default ServicesList
