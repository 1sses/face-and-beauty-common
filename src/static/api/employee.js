import serverConfig from '../config/server.config'
import axios from 'axios'

export const appendNewEmployee = async (formData) => {
  const config = {
    method: 'put',
    url: serverConfig.appendEmployeeURL,
    data: formData,
    withCredentials: true,
    headers: { 'Content-Type': 'multipart/form-data' }
  }
  const response = await axios(config)
  return response.data
}

export const getEmployees = async () => {
  const config = {
    method: 'get',
    url: serverConfig.getEmployeesURL,
    withCredentials: true
  }
  const response = await axios(config)
  return response.data
}

export const getEmployeeById = async (id) => {
  const config = {
    method: 'put',
    data: { id },
    url: serverConfig.getEmployeeByIdURL,
    withCredentials: true
  }
  const response = await axios(config)
  return response.data
}

export const updateEmployeeInfo = async (formData) => {
  const config = {
    method: 'put',
    url: serverConfig.updateEmployeeInfoURL,
    data: formData,
    withCredentials: true,
    headers: { 'Content-Type': 'multipart/form-data' }
  }
  const response = await axios(config)
  return response.data
}

export const deleteEmployee = async (formData) => {
  const config = {
    method: 'put',
    url: serverConfig.deleteEmployeeURL,
    data: formData,
    withCredentials: true
  }
  const response = await axios(config)
  return response.data
}
