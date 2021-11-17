import React, { useEffect, useState } from 'react'
import style from './About.module.scss'
import PageHeader from '../../../components/PageHeader'
import { getStatistics } from '../../../api/statistics'
import { Line } from 'react-chartjs-2'
import { getOptions } from '../../../helpers/chartOptions'
import Loader from '../../../Loader'
import useLoader from '../../../hooks/useLoader'

const About = () => {
  const [loader, endLoading] = useLoader()
  const [usersCount, setUsersCount] = useState(0)
  const [stats, setStats] = useState({})
  useEffect(() => {
    getStatistics()
      .then(res => {
        setUsersCount(res.usersCount)
        setStats(res.stats)
        endLoading()
      })
      .catch(err => console.log(err))
  }, [])
  const getData = () => ({
    labels: Object.keys(stats),
    datasets: [{
      data: Object.keys(stats).map(key => stats[key]),
      hitRadius: 5,
      pointBackgroundColor: 'deepskyblue',
      borderColor: 'deepskyblue',
      borderWidth: 3
    }]
  })

  const data = getData()
  const options = getOptions()
  return (
    <main className={style.wrapper}>
      <PageHeader header="О нас" />
      {loader
        ? <Loader />
        : <article className={style.description}>
        <p>Быть внешне привлекательным в любое время суток - легко!
          Для этого нужно всего лишь хорошее настроение и желание меняться в лучшую сторону.
          Остальное возьмет на себя команда парикмахерской <strong>Face&Beauty</strong>.
          Мы гарантируем индивидуальный подход к каждому клиенту и бережное отношение.
          Парикмахерская <strong>Face&Beauty</strong> - уникальное место с прекрасной атмосферой и вежливым персоналом!
          Здесь мы рады предложить следующие услуги:</p>
        <ul>
          <li>стрижки и укладки на любой случай жизни для всей семьи;</li>
          <li>профессиональный уход за волосами;</li>
          <li>простые и сложные окрашивания;</li>
          <li>косметические процедуры по уходу за кожей лица и тела;</li>
          <li>ритуалы для разных зон, депиляцию и обертывание;</li>
          <li>аппаратный маникюр и педикюр с покрытием и без;</li>
          <li>архитектура и окрашивание бровей;</li>
          <li>наращивание ресниц.</li>
        </ul>
        <p>В настоящий момент на нашем сайте зарегистрировано {usersCount} пользователей, и их число продолжает
          расти!</p>
        <div>
          <Line type="line" data={data} options={options}/>
        </div>
        <p>Своим постоянным клиентам парикмахерская <strong>Face&Beauty</strong> предоставляет гибкую систему скидок и
          привилегии.
          Процедуры выполняются профессионалами своего дела,
          которые знают толк в работе и готовы трудиться до достижения цели.
          Мастера используют для создания гармоничного образа только качественную косметику.
          Будь уверен(а), что благодаря нашим средствам и волшебным рукам специалистов твоя внешность
          всегда будет оставаться на высоте.</p>
        <p>Хотите преподнести незабываемый презент второй половине?
          Не знаете, что подарить близким на день рождения или любой другой праздник?
          Мы знаем, как вам помочь! В парикмахерской <strong>Face&Beauty</strong> вы можете приобрести
          дизайнерские подарочные сертификаты практически на любые услуги разным номиналом.
          Мы ценим всех своих клиентов, поэтому предлагаем абсолютно бесплатную доставку сертификатов по городу
          при сумме заказа более 250 рублей. Заказать их можно, позвонив по контактному телефону
          или приобрести непосредственно в салоне.</p>
        <p>Парикмахерская <strong>Face&Beauty</strong> - это место, где каждый клиент является творцом своего образа.
          Приезжайте к нам - мы будем всегда рады и окажем услуги на высшем уровне!</p>
      </article>}
    </main>
  )
}

export default About
