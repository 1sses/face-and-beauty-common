import React, { useContext } from 'react'
import Auth from '../../../components/Auth'
import { Link, useHistory } from 'react-router-dom'
import { registerUser } from '../../../api/auth'
// import { AuthContext } from '../../../context/auth'
import { ReporterContext } from '../../../context/reporter'
import Password from '../../../components/UI/Password'
import useInput from '../../../hooks/useInput'
import Input from '../../../components/UI/Input'
import { mainPath } from '../../../config/path.config'

const SignUp = () => {
  const [email, emailHandler] = useInput('')
  const [password, passwordHandler] = useInput('')
  const reporter = useContext(ReporterContext)
  // const { setAuth } = useContext(AuthContext)
  const history = useHistory()
  const clickHandler = () => {
    registerUser(email, password)
      .then(
        res => {
          if (!res.error) {
            reporter.showReporter(res.message, false)
            // setAuth(res.role) // пока нет подтверждения email
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
      <span>Уже зарегистрированы? <Link to={mainPath.LOGIN}>Войти</Link></span>
    </Auth>
  )
}

export default SignUp
