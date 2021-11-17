import React, { useContext } from 'react'
import Auth from '../../../components/Auth'
import { Link, useHistory } from 'react-router-dom'
import { loginUser } from '../../../api/auth'
import { AuthContext } from '../../../context/auth'
import { ReporterContext } from '../../../context/reporter'
import useInput from '../../../hooks/useInput'
import Password from '../../../components/UI/Password'
import Input from '../../../components/UI/Input'
import { mainPath } from '../../../config/path.config'

const SignIn = () => {
  const [email, emailHandler] = useInput('')
  const [password, passwordHandler] = useInput('')
  const { setAuth } = useContext(AuthContext)
  const reporter = useContext(ReporterContext)
  const history = useHistory()
  const clickHandler = () => {
    loginUser(email, password)
      .then(
        res => {
          if (!res.error) {
            reporter.showReporter(res.message, false)
            setAuth(res.role)
            history.push(mainPath.ROOT)
          } else {
            reporter.showReporter(res.error, true)
          }
        }
      )
      .catch(err => console.log(err))
  }
  return (
    <Auth>
      <Input type="email" placeholder="Введите email" value={email} onChange={emailHandler} />
      <Password value={password} changeValue={passwordHandler} placeholder="Введите пароль" />
      <button onClick={clickHandler}>Подтвердить</button>
      <Link to={mainPath.FORGET_PASSWORD}>Забыли пароль?</Link>
      <span>Новый пользователь? <Link to={mainPath.REGISTRATION}>Зарегистрироваться</Link></span>
    </Auth>
  )
}

export default SignIn
