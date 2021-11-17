import serverConfig from '../config/server.config'
import axios from 'axios'

export const appendMessage = async (formData) => {
  const config = {
    method: 'post',
    url: serverConfig.appendMessageURL,
    data: formData,
    withCredentials: true
  }
  const response = await axios(config)
  return response.data
}

export const getMessages = async () => {
  const config = {
    method: 'get',
    url: serverConfig.getMessagesURL,
    withCredentials: true
  }
  const response = await axios(config)
  return response.data
}

export const deleteMessage = async (formData) => {
  const config = {
    method: 'put',
    url: serverConfig.deleteMessageURL,
    data: formData,
    withCredentials: true
  }
  const response = await axios(config)
  return response.data
}
