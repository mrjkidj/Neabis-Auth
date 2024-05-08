import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://165.227.147.154:8081/'
})
export default instance