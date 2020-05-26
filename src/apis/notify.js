import { apiHelper } from '../utils/helpers'

export default {
  getHistory() {
    return apiHelper.get('/historicalMessage')
  },
  postHistory({ formData }) {
    return apiHelper.post('/historicalMessage', formData)
  },
  getStatistic() {
    return apiHelper.get('/Statistic')
  }
}