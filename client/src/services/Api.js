import axios from 'axios'
import store from '@/store'
import config from '@/SETTINGS'

export default () => axios.create({
  baseURL: config.url,
  headers: {
    'x-access-token': store.getters.token
  }
})
