import serverConfig from '../config/server.config'
import axios from 'axios'

export const getStatistics = async () => {
  const config = {
    method: 'get',
    url: serverConfig.statisticsURL,
    withCredentials: true
  }
  const response = await axios(config)
  return response.data
}
