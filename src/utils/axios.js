// utils/axios.js

import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000', // Replace with your backend URL
    withCredentials: true, // Allows sending and receiving cookies
    headers: {
        'Content-Type': 'application/json',
    },
})

export default axiosInstance
