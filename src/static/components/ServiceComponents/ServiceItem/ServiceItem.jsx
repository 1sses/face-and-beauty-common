import React, { useState } from 'react'
import classNames from 'classnames'
import style from './ServiceItem.module.scss'

const ServiceItem = ({ category }) => {
  const [clicked, setClicked] = useState(false)
  const switchClicked = () => setClicked(!clicked)
  const headerClasses = classNames({ [style.header]: true, [style.headerClicked]: clicked })
  const popupClasses = classNames({ [style.popup]: true, [style.popupClicked]: clicked })

  return (
    <div className={style.wrapper}>
      <h2 className={headerClasses} tabIndex={0} onClick={switchClicked}>{category.name}</h2>
      {category.types.map((service, i) =>
        <div key={i} className={popupClasses}>
          {service.type} - {service.price} руб.
        </div>)}
    </div>
  )
}

export default ServiceItem
