import Api from '@/services/Api'

export default {
  login (creds) {
    return Api().post('login', creds)
  },
  register (creds) {
    return Api().post('register', creds)
  },
  get (id) {
    return Api().get(`user/${id}`)
  },
  info () {
    return Api().get('userInfo')
  }
}
