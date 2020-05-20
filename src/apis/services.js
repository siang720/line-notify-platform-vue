import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getServices() {
    return apiHelper.get('/services', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  updateService({ serviceId, formData }) {
    return apiHelper.put(`/services/${serviceId}`, formData, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  deleteService(serviceId) {
    return apiHelper.delete(`services/${serviceId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}