import React, { useEffect } from 'react'
import style from './Modal.module.scss'
import classNames from 'classnames'

const Modal = ({ visible, setVisible, children }) => {
  const styles = classNames({
    [style.modalOut]: true,
    [style.animation]: visible
  })
  useEffect(() => {
    document.body.style.overflowY = visible ? 'hidden' : 'auto'
  }, [visible])
  const outerClickHandler = (e) => !e.target.closest(`.${style.modal}`) && setVisible(false)
  return (
    <div className={styles} onClick={outerClickHandler}>
      <div className={style.modal}>
        {children}
      </div>
    </div>
  )
}

export default Modal
