import axios from 'axios'

const API_URL = 'https://nozama-api.onrender.com/api/users/'

//register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//logout user
const logout = () => {
    localStorage.removeItem('user')
}

//signin user
const signin = async (userData) => {
    const response = await axios.post(API_URL + "login", userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}


const getUser = async (userData) => {
    const response = await axios.get(API_URL + "user", userData)
    return response.data
}

const updateUser = async (userData, token) => {
    const config ={
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    console.log(userData)
    const response = await axios.put(API_URL + "update", userData, config)
    
    if(response.data){
        localStorage.removeItem('user')
        localStorage.setItem('user', JSON.stringify(userData))
    }
    return response.data
}

const authService = {
    register,
    logout,
    signin,
    getUser,
    updateUser
}

export default authService