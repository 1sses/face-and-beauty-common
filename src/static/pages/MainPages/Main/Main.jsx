import React from 'react'
import { Link } from 'react-router-dom'
import style from './Main.module.scss'
import acquaintance from '../../../images/parikmaher-universal.png'
import haircut from '../../../images/icons/haircut.png'
import care from '../../../images/icons/care.png'
import coloring from '../../../images/icons/coloring.png'
import nail from '../../../images/icons/nail.png'
import cosmetics from '../../../images/icons/cosmetics.png'
import brow from '../../../images/icons/brow.png'
import birthday from '../../../images/birthday.jpg'

const Main = () => {
  return (
    <main className={style.wrapper}>
      <section className={style.title}>
        <h1 className={style.header}>Face&Beauty</h1>
        <h2>Реализуй свои самые смелые идеи</h2>
        <h2 className={style.little}>• КРАСОТА •</h2>
      </section>
      <section className={style.services}>
        <Link to="/services#women">Женский зал</Link>
        <Link to="/services#men">Мужской зал</Link>
        <Link to="/services#kids">Детский зал</Link>
        <Link to="/services#color">Окрашивание</Link>
        <Link to="/services#cosmetic">Косметический зал</Link>
        <Link to="/services#nail">Маникюрный зал</Link>
        <Link to="/services#brow">Зал бровей</Link>
      </section>
      <section className={style.image}>
        <img src={acquaintance} alt="image is here" />
        <article>
          <h2>Будем знакомиться?</h2>
          <p>Скидка 10% в первую нашу встречу на абсолютно любую услугу.</p>
          <h2>Пригласи друга</h2>
          <p>Приходи с другом/подругой и получай скидку в 5% на абсолютно любую услугу.</p>
        </article>
      </section>
      <section className={style.serviceBlocks}>
        <Link to="/service/men" className={style.serviceItem}>
          <img src={haircut} alt="icon is here"/>
          <h2>Модные стрижки</h2>
          <p>Сделаем тебя неотразимым на любом мероприятии и в реальной жизни.</p>
        </Link>
        <Link to="/service/women" className={style.serviceItem}>
          <img src={care} alt="icon is here"/>
          <h2>Уход за волосами</h2>
          <p>Гарантируем пышные и здоровые волосы. Мы используем только качественные бальзамы и шампуни
          от проверенных брендов.</p>
        </Link>
        <Link to="/service/color" className={style.serviceItem}>
          <img src={coloring} alt="icon is here"/>
          <h2>Окрашивание</h2>
          <p>Сделаем твои волосы яркими и красивыми, чтобы захватить внимание окружающих. Твоя красота это наша работа.</p>
        </Link>
        <Link to="/service/nail" className={style.serviceItem}>
          <img src={nail} alt="icon is here"/>
          <h2>Маникюр</h2>
          <p>Сделаем твои ногти аккуратными и красивыми, пусть все будут впечатлены ими.</p>
        </Link>
        <Link to="/service/cosmetic" className={style.serviceItem}>
          <img src={cosmetics} alt="icon is here"/>
          <h2>Косметические услуги</h2>
          <p>Намечается праздник, вечеринка, или ты просто хочешь выглядеть классно?
            Смело обращайся к нам, сделаем тебя главным лицом общества.</p>
        </Link>
        <Link to="/service/brow" className={style.serviceItem}>
          <img src={brow} alt="icon is here"/>
          <h2>Коррекция и окрашивание бровей</h2>
          <p>Правильные и красивые брови подчеркивают красоту лица и делают акценты на глазах и прочих достоинствах.</p>
        </Link>
      </section>
      <section className={style.image}>
        <img src={birthday} alt="image is here" />
        <article>
          <h2>День рождения</h2>
          <p>Мы предоставляем скидку 10% на все услуги 7 дней до и 7 дней после вашего дня рождения!</p>
        </article>
      </section>
    </main>
  )
}

export default Main
