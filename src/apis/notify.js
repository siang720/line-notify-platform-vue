import { apiHelper } from '../utils/helpers'
const getToken = () => localStorage.getItem('token')
const config = { headers: { Authorization: `Bearer ${getToken()}` } }

export default {
  getHistory() {
    return apiHelper.get('/historicalMessage', config)
  },
  postHistory({ formData }) {
    return apiHelper.post('/historicalMessage', formData, config)
  }
}