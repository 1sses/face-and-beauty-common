import React from 'react'
import style from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={style.wrapper}>
      <section className={style.item}>
        <h2 className={style.header}>Face&Beauty</h2>
        <p className={style.text}>Парикмахерская Face&Beauty (Фэйсэнбьюти) - место, где ты можешь стать лучшей версией себя!
        Это - современная эстетика безупречности и яркого стиля. Это место, где создаются самые запоминающиеся и яркие образы!
        Face&Beauty - территория, где царит атмосфера дружелюбия и вдохновления твоей истинной красотой!
          Наша команда современных и креативных профессионалов ждёт тебя! Подари себе эмоции, которые никогда не забудешь!</p>
      </section>
      <section className={style.item}>
        <h2 className={style.header}>Контакты</h2>
        <p className={style.text}>Адрес: г. Некий, ул. Некая, 00</p>
        <p className={style.text}>Станция метро Некая Академия</p>
        <p className={style.text}>Email: <a href="mailto:face-and-beauty@test.ru">face-and-beauty@ДАЛЬШЕ ПРИДУМАТЬ</a></p>
        <p className={style.text}>Телефон: <a href="tel:+375000000000">+375 (00) 000-00-00</a></p>
      </section>
      <section className={style.item}>
        <h2 className={style.header}>Время работы</h2>
        <p className={style.text}>Каждый день с 9:00 до 22:00</p>
      </section>
    </footer>
  )
}

export default Footer
