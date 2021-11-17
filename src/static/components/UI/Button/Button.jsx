import React from 'react'
import style from './Button.module.scss'
import classNames from 'classnames'

const Button = ({ text, confirm, className, ...rest }) => {
  const styles = classNames({ [style.button]: true, [style.confirm]: confirm, [className]: true })
  return <button className={styles} {...rest}>{text}</button>
}

export default Button
