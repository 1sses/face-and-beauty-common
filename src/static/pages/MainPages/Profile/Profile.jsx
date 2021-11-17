import React, { useContext } from 'react'
import { AuthContext } from '../../../context/auth'
import { Switch, Route, useHistory, Redirect } from 'react-router-dom'
import { adminRoutes, barberRoutes, userRoutes } from '../../../router/profile'
import style from './Profile.module.scss'
import ProfileNavLink from '../../../components/ProfileNavLink'
import Loader from '../../../Loader'
import { mainPath, profilePath } from '../../../config/path.config'

const Profile = () => {
  const { auth } = useContext(AuthContext)
  const history = useHistory()
  const current = history.location.pathname
  if (auth === 'unauth') history.push(mainPath.LOGIN)
  return (
    <main className={style.wrapper}>
      {auth === 'pending'
        ? <Loader/>
        : <>
          <aside className={style.navBar}>
            <ProfileNavLink title="Профиль" to={profilePath.PERSONAL} current={current}/>
            <ProfileNavLink title="Записи" to={profilePath.APPOINTMENTS} current={current}/>
            {auth === 'barber' && <ProfileNavLink title="Заказы" to={profilePath.ORDERS} current={current}/>}
            {auth === 'admin' && <ProfileNavLink title="Сотрудники" to={profilePath.EMPLOYEES} current={current}/>}
            {auth === 'admin' && <ProfileNavLink title="Услуги" to={profilePath.SERVICES_EDITOR} current={current}/>}
            {auth === 'admin' && <ProfileNavLink title="Статьи" to={profilePath.ARTICLES_EDITOR} current={current}/>}
            {auth === 'admin' && <ProfileNavLink title="Сообщения" to={profilePath.MESSAGES} current={current}/>}
          </aside>
          <section className={style.settings}>
            <Switch>
              {userRoutes.map(route => <Route key={1} {...route} />)}
              {auth === 'barber' && barberRoutes.map(route => <Route key={1} {...route} />)}
              {auth === 'admin' && adminRoutes.map(route => <Route key={1} {...route} />)}
              <Redirect to="/profile/personal"/>
            </Switch>
          </section>
        </>
        }
    </main>
  )
}

export default Profile
