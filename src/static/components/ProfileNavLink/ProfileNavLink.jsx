import React from 'react'
import { useHistory } from 'react-router-dom'
import style from './ProfileNavLink.module.scss'
import classNames from 'classnames'

const ProfileNavLink = ({ title, to, current }) => {
  const styles = classNames({
    [style.wrapper]: true,
    [style.highlighted]: current === to
  })
  const history = useHistory()
  const clickHandler = () => history.push(to)
  return (
    <div className={styles} onClick={clickHandler}>
      <span>{title}</span>
    </div>
  )
}

export default ProfileNavLink
