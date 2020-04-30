import axios from 'axios'

const api = axios.create({
  baseURL: 'http://10.0.0.111:3333'
})

// 192.168.1.131
// 10.0.0.111

export default api