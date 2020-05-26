import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')
const config = { headers: { Authorization: `Bearer ${getToken()}` } }

export default {
  getServices() {
    return apiHelper.get('/services', config)
  },
  updateService({ serviceId, formData }) {
    return apiHelper.put(`/services/${serviceId}`, formData, config)
  },
  deleteService(serviceId) {
    return apiHelper.delete(`services/${serviceId}`, config)
  },
  postService({ formData }) {
    return apiHelper.post('/services', formData, config)
  },
  getServicesSnapshot() {
    return apiHelper.get('/ServicesSnapshot', config)
  }
}