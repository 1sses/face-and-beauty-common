import serverConfig from '../config/server.config'
import axios from 'axios'

export const changeUserAvatar = async (formData) => {
  const config = {
    method: 'put',
    url: serverConfig.changeAvatarURL,
    data: formData,
    withCredentials: true,
    headers: { 'Content-Type': 'multipart/form-data' }
  }
  const response = await axios(config)
  return response.data
}

export const changeUserName = async (formData) => {
  const config = {
    method: 'put',
    url: serverConfig.changeUserNameURL,
    data: formData,
    withCredentials: true
  }
  const response = await axios(config)
  return response.data
}

// export const changeUserStatus = async (formData) => {
//   const config = {
//     method: 'put',
//     url: serverConfig.changeUserStatusURL,
//     data: formData,
//     withCredentials: true
//   }
//   const response = await axios(config)
//   return response.data
// }

export const changeUserEmail = async (formData) => { // нормальное подтверждение
  const config = {
    method: 'put',
    url: serverConfig.changeUserEmailURL,
    data: formData,
    withCredentials: true
  }
  const response = await axios(config)
  return response.data
}

export const changeUserPassword = async (formData) => {
  const config = {
    method: 'put',
    url: serverConfig.changeUserPasswordURL,
    data: formData,
    withCredentials: true
  }
  const response = await axios(config)
  return response.data
}

export const getPersonalData = async () => {
  const config = {
    method: 'get',
    url: serverConfig.getPersonalDataURL,
    withCredentials: true
  }
  const response = await axios(config)
  return response.data
}
