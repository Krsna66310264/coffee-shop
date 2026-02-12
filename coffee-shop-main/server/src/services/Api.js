// services/Api.js
import axios from 'axios'
import { useAuthenStore } from '../stores/authen'

export default () => {
    const authenStore = useAuthenStore()
    
    return axios.create({
        baseURL: 'http://localhost:8081/',
        headers: {
            // สำคัญ: แนบ Token ถ้ามี
            Authorization: authenStore.token ? `Bearer ${authenStore.token}` : ''
        }
    })
}