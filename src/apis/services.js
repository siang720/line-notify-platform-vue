import { apiHelper } from './../utils/helpers'

export default {
  getServices() {
    return apiHelper.get('/services')
  },
  updateService({ serviceId, formData }) {
    return apiHelper.put(`/services/${serviceId}`, formData)
  },
  deleteService(serviceId) {
    return apiHelper.delete(`services/${serviceId}`)
  },
  postService({ formData }) {
    return apiHelper.post('/services', formData)
  },
  getServicesSnapshot() {
    return apiHelper.get('/ServicesSnapshot')
  }
}