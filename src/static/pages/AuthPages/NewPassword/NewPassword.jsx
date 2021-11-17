import React from 'react'
import Auth from '../../../components/Auth'
import Password from '../../../components/UI/Password'

const NewPassword = () => {
  return (
    <Auth>
      <div>
        <Password placeholder="Введите пароль" />
      </div>
      <button>Подтвердить</button>
      <span>Введите новый пароль</span>
      <span>Не забывайте его на этот раз :)</span>
    </Auth>
  )
}

export default NewPassword
