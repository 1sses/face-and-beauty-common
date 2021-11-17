import serverConfig from '../config/server.config'
import axios from 'axios'

export const appendAppointmentAuto = async (serviceId, time) => {
  const config = {
    method: 'put',
    data: { serviceId, time },
    url: serverConfig.appendAppointmentAuto,
    withCredentials: true
  }
  const response = await axios(config)
  return response.data
}

export const appendAppointmentHard = async (serviceId, time) => {
  const config = {
    method: 'put',
    data: { serviceId, time },
    url: serverConfig.appendAppointmentHard,
    withCredentials: true
  }
  const response = await axios(config)
  return response.data
}

export const getAllAppointments = async () => {
  const config = {
    method: 'get',
    url: serverConfig.getAllAppointmentsURL,
    withCredentials: true
  }
  const response = await axios(config)
  return response.data
}

export const getCurrentAppointments = async () => {
  const config = {
    method: 'get',
    url: serverConfig.getCurrentAppointmentsURL,
    withCredentials: true
  }
  const response = await axios(config)
  return response.data
}

export const getEmployeeOrders = async (employeeId, type) => {
  const config = {
    method: 'put',
    data: { employeeId, type },
    url: serverConfig.getEmployeeOrdersURL,
    withCredentials: true
  }
  const response = await axios(config)
  return response.data
}

export const getUserOrders = async () => {
  const config = {
    method: 'get',
    url: serverConfig.getUserOrdersURL,
    withCredentials: true
  }
  const response = await axios(config)
  return response.data
}

export const deleteEmployeeOrder = async (id) => {
  const config = {
    method: 'put',
    data: { id },
    url: serverConfig.deleteOrderURL,
    withCredentials: true
  }
  const response = await axios(config)
  return response.data
}
//
// export const getCategoriesByGroup = async (group) => {
//   const config = {
//     method: 'put',
//     data: { group },
//     url: serverConfig.getCategoriesByGroupURL,
//     withCredentials: true
//   }
//   const response = await axios(config)
//   return response.data
// }
//
// export const getAllServices = async () => {
//   const config = {
//     method: 'get',
//     url: serverConfig.getAllServicesGroupedURL,
//     withCredentials: true
//   }
//   const response = await axios(config)
//   return response.data
// }
//
// export const getAllServicesRaw = async () => {
//   const config = {
//     method: 'get',
//     url: serverConfig.getAllServices,
//     withCredentials: true
//   }
//   const response = await axios(config)
//   return response.data
// }
//
// export const updateService = async (id, group, category, type, price) => {
//   const config = {
//     method: 'put',
//     data: { id, group, category, type, price },
//     url: serverConfig.updateServiceURL,
//     withCredentials: true
//   }
//   const response = await axios(config)
//   return response.data
// }
//
// export const deleteService = async (id) => {
//   const config = {
//     method: 'put',
//     data: { id },
//     url: serverConfig.deleteServiceURL,
//     withCredentials: true
//   }
//   const response = await axios(config)
//   return response.data
// }
