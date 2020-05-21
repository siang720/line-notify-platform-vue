import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')
const config = { headers: { Authorization: `Bearer ${getToken()}` } }

export default {
  getCurrentUser() {
    return apiHelper.get(`/get_current_user`, config)
  },
  get({ userId }) {
    return apiHelper.get(`/users/${userId}`, config)
  }
}