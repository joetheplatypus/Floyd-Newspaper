import Api from '@/services/Api'

export default {
  index (cat) {
    return Api().get('posts', {
      params: {
        cat: cat
      }
    })
  },
  post (item) {
    return Api().post('posts', item)
  },
  get (id) {
    return Api().get(`posts/${id}`)
  }
}
