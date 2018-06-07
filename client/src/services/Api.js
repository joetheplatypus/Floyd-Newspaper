import axios from 'axios'
import store from '@/store'

export default () => axios.create({
  baseURL: 'http://192.168.0.10:8081',
  headers: {
    'x-access-token': store.getters.token
  }
})
