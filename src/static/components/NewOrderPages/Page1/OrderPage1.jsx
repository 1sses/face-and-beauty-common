import React, { useEffect, useState } from 'react'
import style from './OrderPage1.module.scss'
import { getAllServicesRaw } from '../../../api/services'

const OrderPage1 = (
  { setShowPage2, group, setGroup, category, setCategory, type, setType, setServiceId, setServicePrice }
) => {
  const [services, setServices] = useState([])
  const [categories, setCategories] = useState([])
  const [types, setTypes] = useState([])

  useEffect(() => {
    getAllServicesRaw()
      .then(res => {
        if (!res.error) {
          setServices(res)
        } else console.log(res.error)
      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    const categoriedServices =
      Array.from(new Set(services.filter(service => service.group === group).map(service => service.category)))
    setCategories(categoriedServices)
    setCategory({ target: { value: categoriedServices ? categoriedServices[0] : '' } })
  }, [group])

  useEffect(() => {
    const typed = services
      .filter(service => service.group === group && service.category === category)
      .map(service => service.type)
    setTypes(typed)
    setType({ target: { value: typed ? typed[0] : '' } })
  }, [category])

  useEffect(() => {
    const elem = services
      .find(service => service.group === group && service.category === category && service.type === type)
    setServiceId(elem?.id)
    setServicePrice(elem?.price)

    if (type) setShowPage2(true)
    else setShowPage2(false)
  }, [type])

  return (
    <div className={style.wrapper}>
      <div className={style.selects}>
        <span>Группа:</span>
        <select value={group} onChange={setGroup}>
          <option value="" />
          <option value="Женский зал">Женский зал</option>
          <option value="Мужской зал">Мужской зал</option>
          <option value="Детский зал">Детский зал</option>
          <option value="Окрашивание">Окрашивание</option>
          <option value="Косметический зал">Косметический зал</option>
          <option value="Маникюрный зал">Маникюрный зал</option>
          <option value="Зал бровей">Зал бровей</option>
        </select>
        <span>Категория:</span>
        <select value={category} onChange={setCategory}>
          {categories.map(category => <option key={category} value={category}>{category}</option>)}
        </select>
        <span>Тип:</span>
        <select value={type} onChange={setType}>
          {types.map(type => <option key={type} value={type}>{type}</option>)}
        </select>
      </div>
    </div>
  )
}

export default OrderPage1
