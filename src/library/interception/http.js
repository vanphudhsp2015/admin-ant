import axios from 'axios'
import qs from 'qs'
import * as types from '../../contants/ActionAPI'
import Cookies from 'universal-cookie'
const cookies = new Cookies()
function parseError (messages) {
  // Thông Báo Lỗi
  if (messages) {
    if (messages instanceof Array) {
      return Promise.reject({ messages: messages })
    } else {
      return Promise.reject({ messages: [messages] })
    }
  } else {
    return Promise.reject({ messages: ['Lỗi'] })
  }
}
function parseBody (response) {
  if (response.status === 200) {
    return response.data
  } else if (response.status === 201) {
    return response
  } else if (response.status === 204) {
    return response
  } else if (response.status === 400) {
    return response
  } else {
    return this.parseError(response.data.messages)
  }
}
/**
 * axios instance
 */
const instance = axios.create({
  baseURL: `${types.API_URL}/api`,
  paramsSerializer: function (params) {
    return qs.stringify(params, { indices: false })
  }
})
// request header
instance.interceptors.request.use(
  config => {
    // Do something before request is sent
    config.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
    const token = cookies.get('token')
    if (token) {
      config.headers.Authorization = `${'token ' + cookies.get('token')}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// response parse
instance.interceptors.response.use(
  response => {
    return parseBody(response)
  },
  error => {
    // message.warn(error.response.status)
    if (error.response) {
      return parseError(error.response.data)
    } else {
      return Promise.reject(error)
    }
  }
)
export const http = instance
