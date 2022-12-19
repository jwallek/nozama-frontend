import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import cartService from './cartService'


const initialState ={
    items:[],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}



//add item
export const addItem = createAsyncThunk('cart/additem', async(itemData, thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await cartService.addItem(itemData, token)
 
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)  
    }
})

export const getItems = createAsyncThunk('cart/getitems', async(_, thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await cartService.getItems(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteItem = createAsyncThunk('cart/delete', async(id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await cartService.deleteItem(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
export const deleteCart = createAsyncThunk('cart/deletecart', async(_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await cartService.deleteCart(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(addItem.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addItem.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.items.push(action.payload)
            })
            .addCase(addItem.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getItems.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getItems.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.items = action.payload
            })
            .addCase(getItems.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteItem.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.items = state.items.filter(
                    (item) => item._id !== action.payload.id
                )
            })
            .addCase(deleteItem.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteCart.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteCart.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.items = []
            })
            .addCase(deleteCart.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = cartSlice.actions
export default cartSlice.reducer