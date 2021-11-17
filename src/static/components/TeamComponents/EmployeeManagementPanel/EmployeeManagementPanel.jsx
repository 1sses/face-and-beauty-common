import React, { useEffect, useState } from 'react'
import style from './EmployeeManagementPanel.module.scss'
import { getEmployees } from '../../../api/employee'
import EmployeeCard from '../EmployeeCard'
import { useHistory } from 'react-router-dom'
import useLoader from '../../../hooks/useLoader'
import Loader from '../../../Loader'

const EmployeeManagementPanel = () => {
  const [loader, endLoading] = useLoader()

  const [employees, setEmployees] = useState([])
  const history = useHistory()
  const openEmployeePage = (id) => history.push(`/profile/employees/${id}`)
  useEffect(() => {
    getEmployees()
      .then(res => {
        setEmployees(res)
        endLoading()
      })
      .catch(err => console.log(err))
  }, [])
  return (
    <section className={style.wrapper}>
      {loader
        ? <Loader />
        : employees.map(employee =>
      <div key={employee.id} className={style.preview} onClick={openEmployeePage.bind(null, employee.id)}>
        <EmployeeCard employee={employee} />
      </div>
        )}
    </section>
  )
}

export default EmployeeManagementPanel
