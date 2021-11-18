export const baseURL = process.env.BASE_URL ? 'https://1sses.com/api' : 'http://localhost:5000/api'

const settings = {
  validateUserURL: `${baseURL}/validate`,
  registrationURL: `${baseURL}/registration`,
  isAvailableEmailURL: `${baseURL}/is-available-email`,
  loginURL: `${baseURL}/login`,
  logoutURL: `${baseURL}/logout`,

  changeAvatarURL: `${baseURL}/change-avatar`,
  changeUserNameURL: `${baseURL}/change-name`,
  changeUserEmailURL: `${baseURL}/change-email`,
  changeUserPasswordURL: `${baseURL}/change-password`,
  getPersonalDataURL: `${baseURL}/personal-data`,

  appendEmployeeURL: `${baseURL}/new-employee`,
  getEmployeesURL: `${baseURL}/get-employees`,
  getEmployeeByIdURL: `${baseURL}/get-employee`,
  updateEmployeeInfoURL: `${baseURL}/update-employee`,
  deleteEmployeeURL: `${baseURL}/delete-employee`,

  appendServiceURL: `${baseURL}/new-service`,
  getCategoriesByGroupURL: `${baseURL}/get-group-categories`,
  getAllServicesGroupedURL: `${baseURL}/services`,
  getAllServices: `${baseURL}/all-services`,
  updateServiceURL: `${baseURL}/update-service`,
  deleteServiceURL: `${baseURL}/delete-service`,

  appendMessageURL: `${baseURL}/contacts`,
  getMessagesURL: `${baseURL}/get-messages`,
  deleteMessageURL: `${baseURL}/delete-message`,

  appendAppointmentAuto: `${baseURL}/new-appointment-auto`,
  appendAppointmentHard: `${baseURL}/new-appointment-hard`,
  getCurrentAppointmentsURL: `${baseURL}/current-appointments`,
  getAllAppointmentsURL: `${baseURL}/all-appointments`,
  getEmployeeOrdersURL: `${baseURL}/employee-orders`,
  getUserOrdersURL: `${baseURL}/user-orders`,
  deleteOrderURL: `${baseURL}/delete-order`,

  statisticsURL: `${baseURL}/about`
}

export default settings
