import Api from '@/services/Api'

export default {
  index () {
    return Api().get('posts')
  },
  post (item) {
    return Api().post('posts', item)
  },
  get (id) {
    return Api().get(`posts/${id}`)
  }
}
