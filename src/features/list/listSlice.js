import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import listService from './listService'

const initialState ={
    items:[],
    isSaveError: false,
    isSaveSuccess: false,
    isSaveLoading: false,
    message: ''
}

//add item
export const saveItem = createAsyncThunk('list/additem', async(itemData, thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await listService.saveItem(itemData, token)
 
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)  
    }
})

export const getItems = createAsyncThunk('list/getitems', async(_, thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await listService.getItems(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteItem = createAsyncThunk('list/delete', async(id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await listService.deleteItem(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})



export const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        resetSave: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveItem.pending, (state) => {
                state.isSaveLoading = true
            })
            .addCase(saveItem.fulfilled, (state, action) => {
                state.isSaveLoading = false
                state.isSaveSuccess = true
                state.items.push(action.payload)
            })
            .addCase(saveItem.rejected, (state, action) => {
                state.isSaveLoading = false
                state.isSaveError = true
                state.message = action.payload
            })
            .addCase(getItems.pending, (state) => {
                state.isSaveLoading = true
            })
            .addCase(getItems.fulfilled, (state, action) => {
                state.isSaveLoading = false
                state.isSaveSuccess = true
                state.items = action.payload
            })
            .addCase(getItems.rejected, (state, action) => {
                state.isSaveLoading = false
                state.isSaveError = true
                state.message = action.payload
            })
            .addCase(deleteItem.pending, (state) => {
                state.isSaveLoading = true
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                state.isSaveLoading = false
                state.isSaveSuccess = true
                state.items = state.items.filter(
                    (item) => item._id !== action.payload.id
                )
            })
            .addCase(deleteItem.rejected, (state, action) => {
                state.isSaveLoading = false
                state.isSaveError = true
                state.message = action.payload
            })
    }
})

export const { resetSave } = listSlice.actions
export default listSlice.reducer