import SignUp from '../pages/AuthPages/SignUp'
import SignIn from '../pages/AuthPages/SignIn'
import ForgetPassword from '../pages/AuthPages/ForgetPassword'
import NewPassword from '../pages/AuthPages/NewPassword'
import About from '../pages/MainPages/About'
import Team from '../pages/MainPages/Team'
import Services from '../pages/MainPages/Services'
import Articles from '../pages/MainPages/Articles'
import Contacts from '../pages/MainPages/Contacts'
import Profile from '../pages/MainPages/Profile'
import Main from '../pages/MainPages/Main'
import { mainPath } from '../config/path.config'

export const routes = [
  { path: mainPath.REGISTRATION, component: SignUp, exact: true },
  { path: mainPath.LOGIN, component: SignIn, exact: true },
  { path: mainPath.FORGET_PASSWORD, component: ForgetPassword, exact: true },
  { path: mainPath.NEW_PASSWORD, component: NewPassword, exact: true },
  { path: mainPath.ABOUT, component: About, exact: true },
  { path: mainPath.TEAM, component: Team, exact: true },
  { path: mainPath.SERVICES, component: Services, exact: true },
  { path: mainPath.ARTICLES, component: Articles, exact: true },
  { path: mainPath.CONTACTS, component: Contacts, exact: true },
  { path: mainPath.PROFILE, component: Profile, exact: false },
  { path: mainPath.ROOT, component: Main, exact: true }
]
