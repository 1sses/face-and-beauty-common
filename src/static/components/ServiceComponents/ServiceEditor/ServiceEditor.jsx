import React, { useEffect, useState } from 'react'
import style from './ServiceEditor.module.scss'
import Button from '../../UI/Button'
import Input from '../../UI/Input'
import { getCategoriesByGroup } from '../../../api/services'

const ServiceEditor = ({ group, setGroup, category, setCategory, type, setType, price, setPrice, confirm, cancel }) => {
  const [selectInputType, setSelectInputType] = useState(true)
  const [categories, setCategories] = useState([])
  const switchSelectInputType = () => {
    if (!selectInputType) {
      setCategory({ target: { value: categories[0] ?? '' } })
    }
    setSelectInputType(!selectInputType)
  }
  useEffect(() => {
    getCategoriesByGroup(group)
      .then(res => {
        setCategories(res)
        if (res.length > 0) {
          setSelectInputType(true)
          if (category === '' || !~res.indexOf(category)) {
            setCategory({ target: { value: res[0] } })
          }
        } else {
          setSelectInputType(false)
          setCategory({ target: { value: '' } })
        }
      })
      .catch(err => console.log(err))
  }, [group])
  return (
    <section className={style.wrapper}>
      <div className={style.container}>
        <div className={style.selects}>
          <span>Группа:</span>
          <select value={group} onChange={setGroup}>
            <option value="Женский зал">Женский зал</option>
            <option value="Мужской зал">Мужской зал</option>
            <option value="Детский зал">Детский зал</option>
            <option value="Окрашивание">Окрашивание</option>
            <option value="Косметический зал">Косметический зал</option>
            <option value="Маникюрный зал">Маникюрный зал</option>
            <option value="Зал бровей">Зал бровей</option>
          </select>
          <span>Категория:</span>
          <div style={{ position: 'relative' }}>
            <button className={style.switcher} title="Сменить тип ввода" onClick={switchSelectInputType}>
              <i className="fas fa-sync-alt" />
            </button>
            {selectInputType
              ? <select value={category} onChange={setCategory}>
                {categories.map(category => <option key={category} value={category}>{category}</option>)}
            </select>
              : <Input value={category} onChange={setCategory} />}
          </div>
        </div>
        <div className={style.inputs}>
          <span>Тип:</span>
          <Input value={type} onChange={setType} />
          <span>Цена:</span>
          <Input value={price} onChange={setPrice} />
        </div>
      </div>
      <div className={style.buttons}>
        <Button text="Сохранить" confirm={true} onClick={confirm} />
        <Button text="Отменить" confirm={false} onClick={cancel} />
      </div>
    </section>
  )
}

export default ServiceEditor
