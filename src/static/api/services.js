import serverConfig from '../config/server.config'
import axios from 'axios'

export const appendService = async (group, category, type, price) => {
  const config = {
    method: 'put',
    data: { group, category, type, price },
    url: serverConfig.appendServiceURL,
    withCredentials: true
  }
  const response = await axios(config)
  return response.data
}

export const getCategoriesByGroup = async (group) => {
  const config = {
    method: 'put',
    data: { group },
    url: serverConfig.getCategoriesByGroupURL,
    withCredentials: true
  }
  const response = await axios(config)
  return response.data
}

export const getAllServices = async () => {
  const config = {
    method: 'get',
    url: serverConfig.getAllServicesGroupedURL,
    withCredentials: true
  }
  const response = await axios(config)
  return response.data
}

export const getAllServicesRaw = async () => {
  const config = {
    method: 'get',
    url: serverConfig.getAllServices,
    withCredentials: true
  }
  const response = await axios(config)
  return response.data
}

export const updateService = async (id, group, category, type, price) => {
  const config = {
    method: 'put',
    data: { id, group, category, type, price },
    url: serverConfig.updateServiceURL,
    withCredentials: true
  }
  const response = await axios(config)
  return response.data
}

export const deleteService = async (id) => {
  const config = {
    method: 'put',
    data: { id },
    url: serverConfig.deleteServiceURL,
    withCredentials: true
  }
  const response = await axios(config)
  return response.data
}
