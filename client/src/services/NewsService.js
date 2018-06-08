import Api from '@/services/Api'

export default {
  index (cat, limit, start) {
    return Api().get('posts', {
      params: {
        cat: cat,
        limit: limit,
        start: start
      }
    })
  },
  indexFeatured (cat) {
    return Api().get('posts/featured', {
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
  },
  delete (id) {
    return Api().delete(`posts/${id}`)
  },
  getPreview (id) {
    return Api().get(`posts/${id}/preview`)
  },
  // putPreview (item) {
  //   return Api().put(`posts/${item._id}/preview`, item)
  // },
  put (item) {
    return Api().put(`posts/${item._id}`, item)
  },
  uploadImg (data) {
    return Api().post('uploadImg', data)
  }
}
