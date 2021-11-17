import React from 'react'
import style from './Input.module.scss'
import classNames from 'classnames'

const Input = ({ className, placeholder, value, onChange, ...rest }) => {
  const styles = classNames({ [style.input]: true, [className]: true })
  return <input className={styles} placeholder={placeholder} value={value} onChange={onChange} {...rest} />
}

export default Input
