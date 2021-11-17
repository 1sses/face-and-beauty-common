import React from 'react'
import Auth from '../../../components/Auth'
import Input from '../../../components/UI/Input'

const ForgetPassword = () => {
  return (
    <Auth>
      <Input type="email" placeholder="Введите email" />
      <button>Подтвердить</button>
      <span>Введите ваш email</span>
      <span>На него будет отправлена ссылка для восстановления доступа</span>
    </Auth>
  )
}

export default ForgetPassword
