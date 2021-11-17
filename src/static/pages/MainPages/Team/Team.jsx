import React, { useEffect, useState } from 'react'
import style from './Team.module.scss'
import PageHeader from '../../../components/PageHeader'
import EmployeeCard from '../../../components/TeamComponents/EmployeeCard'
import { splitEmployees } from '../../../helpers/splitEmployees'
import { getEmployees } from '../../../api/employee'
import useLoader from '../../../hooks/useLoader'
import Loader from '../../../Loader'

const Team = () => {
  const [loader, endLoading] = useLoader()
  const [employees, setEmployees] = useState([])
  useEffect(() => {
    getEmployees()
      .then(res => {
        setEmployees(res)
        endLoading()
      })
      .catch(err => console.log(err))
  }, [])
  const resultedEmployees = splitEmployees(employees)
  return (
    <main className={style.wrapper}>
      <PageHeader header="Команда"/>
      {loader
        ? <Loader />
        : <div className={style.employees}>
        {resultedEmployees.map((group, i) =>
          <section key={i} className={style.group}>
            {group.map((employee, j) => <EmployeeCard key={j} employee={employee}/>)}
          </section>)}
      </div>}
      <article className={style.description}>
        <p>Мечтаешь оставаться красивым/красивой и ухоженным/ухоженной?
          Тогда мы рады пригласить тебя в уютную атмосферу парикмахерской <strong>Face&Beauty</strong> в Неком.
          У нас работают молодые и креативные профессионалы парикмахерского искусства,
          ногтевого сервиса, косметологи, бровисты, колористы, а также специалисты по уходу за телом.
          Они принимаются на работу на конкурсной основе и регулярно проходят обучение новым технологиям
          в индустрии красоты, что обеспечивает качество, доступность и скорость предоставления услуг на высоком уровне.
          В работе мы используем косметические средства известных брендов, состав которые проверен на практике.
          Поэтому вы всегда можете быть уверены в надежности и безопасности результата.</p>
        <p>Команда наших специалистов заботиться о каждом клиенте и прилагает максимум усилий
          в процессе создания идеального и неповторимого образа. Наш салон красоты – это место,
          где любой человек сможет расслабиться, провести время с комфортом, получить удовольствие и заряд бодрости.
          Работы специалистов вы можете посмотреть в нашем <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>.
        </p>
      </article>
    </main>
  )
}

export default Team
