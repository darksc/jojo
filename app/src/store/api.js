import axios from 'axios'
import qs from 'qs'
// import jsonp from 'jsonp'

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

export const auto = _params => {
  let params = qs.stringify(_params)
  return axios.get(`/auto?${params}`)
}

export const dtfd = _params => {
  let params = qs.stringify(_params)
  return axios.get(`/fragments?${params}`)
}

export const zhzh = _params => {
  let params = qs.stringify(_params)
  return axios.get(`/translate?${params}`)
}

export const zbzy = _params => {
  let params = qs.stringify(_params)
  return axios.get(`/nearby?${params}`)
}

/**
 * sed server
 */

export const sdeDtfd = _params => {
  let params = JSON.stringify(_params)
  return axios.get(`/getSegment?params=${params}`, {
    baseURL: 'http://192.168.0.215:8081/geoserver-sde-jx/rest/action'
  })
}
export const sdeZhzzb = _params => {
  let params = JSON.stringify(_params)
  return axios.get(`/getLonLatByPos?params=${params}`, {
    baseURL: 'http://192.168.0.215:8081/geoserver-sde-jx/rest/action'
  })
}
