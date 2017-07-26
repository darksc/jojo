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

// server 接口
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

export const serverSearchById = _params => {
  return axios.get(api.serverSearchById, {
    params: _params
  })
}

// port 接口
export const portSearch = _params => {
  return axios.get(api.portSearch, {
    params: _params
  })
}

export const portSave = _params => {
  return axios.post(api.portSave, _params)
}

export const portRemove = _params => {
  return axios.get(api.portRemove, {
    params: _params
  })
}

export const portCheckName = _params => {
  return axios.get(api.portCheckName, {
    params: _params
  })
}
