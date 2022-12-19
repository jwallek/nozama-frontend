import axios from 'axios'

const API_URL = 'https://nozama-api.onrender.com/api/orders/'

const addOrder = async (productData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, productData, config)
    return response.data
}
const getOrders = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)
    console.log(response.data)
    return response.data
}

const orderService = {
    addOrder,
    getOrders
 }

 export default orderService