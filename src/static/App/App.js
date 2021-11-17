import React, { useEffect, useState } from 'react'
import './App.scss'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Header from '../common/Header'
import Footer from '../common/Footer'
import { AuthContext } from '../context/auth'
import { routes } from '../router/main'
import Reporter from '../common/Reporter'
import { ReporterContext } from '../context/reporter'
import useReporter from '../hooks/useReporter'
import { validateUser } from '../api/auth'
import Modal from '../Modal'
import CommonPage from '../components/NewOrderPages/CommonPage'

function App () {
  const [auth, setAuth] = useState('pending')
  const [modal, setModal] = useState(false)
  const openModal = () => setModal(true)
  const closeModal = () => setModal(false)
  useEffect(() => {
    validateUser()
      .then(res => res.error ? setAuth('unauth') : setAuth(res.role))
      .catch(err => console.log(err))
  }, [])
  return (
    <AuthContext.Provider value={{
      auth,
      setAuth
    }}>
      <ReporterContext.Provider value={useReporter()}>
        <Reporter/>
        <Router>
          <Header/>
          <Switch>
            {routes.map(route => <Route key={1} {...route} />)}
             <Redirect to="/"/>
          </Switch>
          <Modal visible={modal} setVisible={setModal}>
            <CommonPage />
          </Modal>
          <div className="haircut-reg" title="Онлайн-запись" onClick={openModal}>
            <i className="far fa-edit"/>
          </div>
          <Footer/>
        </Router>
      </ReporterContext.Provider>
    </AuthContext.Provider>
  )
}

export default App
