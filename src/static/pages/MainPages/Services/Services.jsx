import React, { useEffect, useState } from 'react'
import style from './Services.module.scss'
import ServiceZone from '../../../components/ServiceComponents/ServiceZone'
import { getAllServices } from '../../../api/services'
import useLoader from '../../../hooks/useLoader'
import Loader from '../../../Loader'

const groups = ['Женский зал', 'Мужской зал', 'Детский зал', 'Окрашивание', 'Косметический зал', 'Маникюрный зал', 'Зал бровей']
const ids = ['women', 'men', 'kids', 'color', 'cosmetic', 'nail', 'brow']

const Services = () => {
  const [loader, endLoading] = useLoader()
  const [services, setServices] = useState([])
  useEffect(() => {
    getAllServices()
      .then(res => {
        if (!res.error) setServices(res)
        endLoading()
      })
      .catch(err => console.log(err))
  }, [])
  return (
    <main className={style.wrapper}>
      <section className={style.header}>
        <h1>Face&Beauty</h1>
        <h2>Услуги</h2>
      </section>
      {loader
        ? <Loader/>
        : <div>
          {services.map((group, i) =>
            <ServiceZone
              key={i}
              id={ids.at(i)}
              header={groups.at(i)}
              services={group}
            />)}
        </div>}
    </main>
  )
}

export default Services
