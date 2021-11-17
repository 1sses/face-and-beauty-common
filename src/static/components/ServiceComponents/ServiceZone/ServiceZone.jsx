import React from 'react'
import style from './ServiceZone.module.scss'
import ServiceItem from '../ServiceItem'

const ServiceZone = ({ id, header, services }) => {
  return (
    <section className={style.zone}>
      <h2 className={style.serviceHeader} id={id}>{header}</h2>
      {services.map((service, i) => <ServiceItem key={i} category={service} />)}
    </section>
  )
}

export default ServiceZone
