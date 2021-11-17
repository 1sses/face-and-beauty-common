import React from 'react'
import style from './HeaderLink.module.scss'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

const HeaderLink = ({ title, to, current, ...rest }) => {
  const styles = classNames({
    [style.link]: true,
    [style.highlighted]: current === to
  })
  return <Link to={to} className={styles} {...rest}>{title}</Link>
}

export default HeaderLink
