import React from 'react'
import style from './ArticlePreview.module.scss'

const ArticlePreview = () => {
  return (
    <div className={style.wrapper}>
      <div />
      <span>24 октября, 2020</span>
      <h3>Женские стрижки</h3>
      <a href="#">Читать далее</a> {/* реализация */}
    </div>
  )
}

export default ArticlePreview
