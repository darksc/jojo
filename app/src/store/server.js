import axios from 'axios'
import * as api from './api'

const baseURL = process.env.SERVICE_URL
const defaults = {
  baseURL: baseURL,
  headers: {
    post: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
}

Object.assign(axios.defaults, defaults)

export const serverSave = _params => {
  return axios.post(api.serverSave, _params)
}

export const serverSearch = _params => {
  return axios.get(api.serverSearch)
}

export const serverCheckName = _params => {
  return axios.get(api.serverCheckName, {
    params: _params
  })
}

export const serverRemove = _params => {
  return axios.get(api.serverRemove, {
    params: _params
  })
}
