import React, { useContext } from 'react'
import style from './Reporter.module.scss'
import classNames from 'classnames'
import { ReporterContext } from '../../context/reporter'

const Reporter = () => {
  const reporter = useContext(ReporterContext)
  const styles = classNames({
    [style.wrapper]: true,
    [style.alert]: reporter.alert,
    [style.animation]: reporter.visible
  })
  return (
    <div className={styles}>
      <i className="far fa-times-circle" onClick={reporter.closeHandler}/>
      <span>{reporter.content}</span>
    </div>
  )
}

export default Reporter
