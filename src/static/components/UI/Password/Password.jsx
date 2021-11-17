import React, { useState } from 'react'
import style from './Password.module.scss'
import Input from '../Input'

const Password = ({ value, changeValue, placeholder, ...rest }) => {
  const [hidden, setHidden] = useState(true)
  const switchHidden = () => setHidden(!hidden)
  return (
    <div className={style.wrapper}>
      <Input type={hidden ? 'password' : 'text'} placeholder={placeholder} value={value} onChange={changeValue} {...rest} />
      {hidden ? <i className="far fa-eye" onClick={switchHidden} /> : <i className="far fa-eye-slash" onClick={switchHidden} />}
    </div>
  )
}

export default Password
