import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import orderService from './orderService'

const initialState ={
    orders:[],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}


export const addOrder = createAsyncThunk('orders/addorder', async(itemData, thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await orderService.addOrder(itemData, token)
 
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)  
    }
})

export const getOrders = createAsyncThunk('orders/getorders', async(_, thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await orderService.getOrders(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(addOrder.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addOrder.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.orders.push(action.payload)
            })
            .addCase(addOrder.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getOrders.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.orders = action.payload
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = orderSlice.actions
export default orderSlice.reducer