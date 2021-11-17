import React, { useContext, useState } from 'react'
import style from './Contacts.module.scss'
import ContactItem from '../../../components/ContactsComponents/ContactItem'
import useInput from '../../../hooks/useInput'
import Input from '../../../components/UI/Input'
import { appendMessage } from '../../../api/message'
import { ReporterContext } from '../../../context/reporter'

const Contacts = () => {
  const [scrollMap, setScrollMap] = useState('none')
  const [name, nameHandler] = useInput('')
  const [email, emailHandler] = useInput('')
  const [message, messageHandler] = useInput('')
  const reporter = useContext(ReporterContext)
  const send = () => {
    if (!name || !email || !message) {
      reporter.showReporter('Пожалуйста, заполните все поля!', true)
      return
    }
    appendMessage({ name, email, message })
      .then(res => {
        if (!res.error) reporter.showReporter(res.message, false)
        else reporter.showReporter(res.error, true)
      })
      .catch(err => console.log(err))
    nameHandler({ target: { value: '' } })
    emailHandler({ target: { value: '' } })
    messageHandler({ target: { value: '' } })
  }
  return (
    <main>
      <div onClick={() => setScrollMap('all')}>
        <iframe
          src="https://yandex.ru/map-widget/v1/?um=constructor%3A9626a5a8f0034b0015651d02907de3098ff518b38ff146e4d65a558da89b1ffe&amp;source=constructor;scroll=false"
          width="100%" height="450" frameBorder="0" style={{ pointerEvents: scrollMap }} />
      </div>
      <section className={style.wrapper} onClick={() => setScrollMap('none')}>
        <section className={style.questionForm}>
          <Input value={name} onChange={nameHandler} placeholder="Имя" />
          <Input type="email" value={email} onChange={emailHandler} placeholder="Email" />
          <textarea placeholder="Ваше сообщение..." value={message} onChange={messageHandler} />
          <button onClick={send}>Отправить сообщение</button>
        </section>
        <article className={style.contacts}>
          <h2>Контакты</h2>
          <p>Используя настоящие контактные данные, ты можешь написать нам сообщение или позвонить в наш салон.</p>
          < ContactItem
            link="https://yandex.by/maps/157/minsk/house/Zk4Ycw5lQEcFQFtpfXVwcHpgYQ==/?ll=27.597408%2C53.910946&source=constructorLink&um=constructor%3Aa84e6665b719b01b3d02359c4b869e18667ce5c8c178e11dad82897ece962395&z=17.75"
            icon={<i className="fas fa-map-marker-alt" />}
            text="г. Некий, ул. Некая, 00, станция метро Некая Академия" />
          < ContactItem
            link="mailto:face-and-beauty@test.ru"
            icon={<i className="fas fa-envelope" />}
            text="face-and-beauty@ПРИДУМАТЬ" />
          < ContactItem
            link="tel:+375000000000"
            icon={<i className="fas fa-phone-alt" />}
            text={'Телефон городской: +375 (00) 000-00-00'} />
          < ContactItem
            link="tel:+375000000000"
            icon={<i className="fas fa-mobile-alt" />}
            text="Мобильный (Viber, WhatsApp, Telegram): +375 (00) 000-00-00" />
          < ContactItem
            link="https://instagram.com"
            icon={<i className="fab fa-instagram" />}
            text="Инстаграм" />
          < ContactItem
            link="https://facebook.com"
            icon={<i className="fab fa-facebook-f" />}
            text="Facebook" />
          < ContactItem
            link="https://vk.com"
            icon={<i className="fab fa-vk" />}
            text="ВКонтакте" />
          < ContactItem
            link="https://telegram.org"
            icon={<i className="fab fa-telegram" />}
            text="Telegram" />
        </article>
      </section>
    </main>
  )
}

export default Contacts
