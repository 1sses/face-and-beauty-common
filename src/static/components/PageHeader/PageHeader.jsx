import React from 'react'
import style from './PageHeader.module.scss'

const PageHeader = ({ header }) => {
  return (
    <section className={style.header}>
      <h2>{header}</h2>
      <p>Главная / {header}</p>
    </section>
  )
}

export default PageHeader
