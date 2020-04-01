import axios from 'axios'

const api = axios.create({
  baseURL: 'http://192.168.1.131:3333'
})

// 192.168.1.131

export default api