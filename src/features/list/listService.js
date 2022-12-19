import axios from 'axios'

const API_URL = '/api/savedlist/'


//add item
const saveItem = async (productData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, productData, config)
    return response.data
}

const getItems = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)
    return response.data
}

const deleteItem = async (productId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + productId, config)
    return response.data
}


 const listService = {
    saveItem,
    getItems,
    deleteItem
 }

 export default listService