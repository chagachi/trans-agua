import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:1234'
})

// 192.168.1.131
// 10.0.0.111
// http://10.0.0.111:1234

export default api