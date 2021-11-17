import Personal from '../pages/ProfilePages/Personal'
import Appointments from '../pages/ProfilePages/Appointments'
import Orders from '../pages/ProfilePages/Orders'
import Employees from '../pages/ProfilePages/Employees'
import ArticlesEditor from '../pages/ProfilePages/ArticlesEditor'
import { profilePath } from '../config/path.config'
import EmployeePage from '../components/TeamComponents/EmployeePage'
import ServicesManager from '../pages/ProfilePages/ServicesManager'
import Messages from '../pages/ProfilePages/Messages'

export const userRoutes = [
  { path: profilePath.PERSONAL, component: Personal, exact: true },
  { path: profilePath.APPOINTMENTS, component: Appointments, exact: true }
]

export const barberRoutes = [
  { path: profilePath.ORDERS, component: Orders, exact: true }
]

export const adminRoutes = [
  { path: profilePath.EMPLOYEES, component: Employees, exact: true },
  { path: profilePath.EMPLOYEE_PAGE, component: EmployeePage, exact: true },
  { path: profilePath.SERVICES_EDITOR, component: ServicesManager, exact: true },
  { path: profilePath.ARTICLES_EDITOR, component: ArticlesEditor, exact: true },
  { path: profilePath.MESSAGES, component: Messages, exact: true }
]
