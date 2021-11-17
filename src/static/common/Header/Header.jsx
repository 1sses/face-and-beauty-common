import React, { useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import style from './Header.module.scss'
import ProfilePreview from '../../components/ProfilePreview'
import { Drawer } from '@mui/material'
import { AuthContext } from '../../context/auth'
import { mainPath, profilePath } from '../../config/path.config'
import HeaderLink from '../../components/HeaderLink'

const Header = () => {
  const userStatus = useContext(AuthContext).auth
  const [panelOpened, setPanelOpened] = useState(false)
  const history = useHistory()
  const [current, setCurrent] = useState(history.location.pathname)
  const panelClick = (e) => {
    setCurrent(history.location.pathname)
    if (e.target.closest('A')) setPanelOpened(false)
  }
  return (
    <>
      <header className={style.wrapperM}>
        <i className={`fas fa-bars ${style.switcher}`} onClick={() => setPanelOpened(true)}/>
        <div className={style.header}>
          <h1 className={style.name}>Face&Beauty</h1>
          <h2 className={style.slogan}>Стань лучшей версией себя</h2>
        </div>
        <Drawer
          anchor={'top'}
          open={panelOpened}
          onClose={() => setPanelOpened(false)}
        >
          <nav className={`${style.links} ${style.linksM}`} onClick={panelClick}>
            <Link to={userStatus === 'unauth' ? mainPath.LOGIN : profilePath.PERSONAL} style={{ color: 'transparent' }}>
              <ProfilePreview/>
            </Link>
            <HeaderLink to={mainPath.ROOT} current={current} title="Главная" />
            <HeaderLink to={mainPath.ABOUT} current={current} title="О нас" />
            <HeaderLink to={mainPath.TEAM} current={current} title="Команда" />
            <HeaderLink to={mainPath.SERVICES} current={current} title="Услуги" />
            <HeaderLink to={mainPath.ARTICLES} current={current} title="Статьи" />
            <HeaderLink to={mainPath.CONTACTS} current={current} title="Контакты" />
          </nav>
        </Drawer>
      </header>
      <header className={style.wrapper}>
        <div className={style.header}>
          <h1 className={style.name}>Face&Beauty</h1>
          <h2 className={style.slogan}>Стань лучшей версией себя</h2>
        </div>
        <nav className={style.links} onClick={() => setCurrent(history.location.pathname)}>
          <HeaderLink to={mainPath.ROOT} current={current} title="Главная" />
          <HeaderLink to={mainPath.ABOUT} current={current} title="О нас" />
          <HeaderLink to={mainPath.TEAM} current={current} title="Команда" />
          <HeaderLink to={mainPath.SERVICES} current={current} title="Услуги" />
          <HeaderLink to={mainPath.ARTICLES} current={current} title="Статьи" />
          <HeaderLink to={mainPath.CONTACTS} current={current} title="Контакты" />
          <Link to={userStatus === 'unauth' ? mainPath.LOGIN : profilePath.PERSONAL} style={{ color: 'transparent' }}>
            <ProfilePreview/>
          </Link>
        </nav>
      </header>
    </>
  )
}

export default Header
