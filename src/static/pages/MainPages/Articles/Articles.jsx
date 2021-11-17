import React, { useState } from 'react'
import PageHeader from '../../../components/PageHeader'
import style from './Articles.module.scss'
import ArticlePreview from '../../../components/ArticlePreview'
import useInput from '../../../hooks/useInput'

const Articles = () => {
  const [headerFilter, headerFilterHandler] = useInput('')
  return (
    <main>
      <PageHeader header="Статьи и публикации" />
      <section className={style.wrapper}>
        <h2>Страница находится в разработке!</h2>
        {/* <section className={style.articles}> */}
        {/*  <ArticlePreview /> */}
        {/* </section> */}
        {/* <aside className={style.filtering}> */}
        {/*  <input type="text" placeholder="Поиск" value={headerFilter} onChange={headerFilterHandler} /> */}
        {/* </aside> */}
      </section>
    </main>
  )
}

export default Articles
