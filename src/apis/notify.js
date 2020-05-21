import { apiHelper } from '../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getHistory() {
    return apiHelper.get('/historicalMessage', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  postHistory({ formData }) {
    return apiHelper.post('/historicalMessage', formData, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}