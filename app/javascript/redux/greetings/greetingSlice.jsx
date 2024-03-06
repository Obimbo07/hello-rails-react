import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@axios';

const GREETINGS_URL = 'http://127.0.0.1:3000/message/index';

export const getGreetings = createAsyncThunk(
    'greetings/getGreetings',
    async (_, thunkApi) => {
        try {
            const response = await axios.get(GREETINGS_URL)
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    },
);

const initialState = {
    message: '',
    isLoading: false,
    error: undefined,
};


export const greetingSlice = createSlice({
    name: 'greetings',
    initialState,
    reducers: { },
    extraReducers(builder) {
    builder
      .addCase(getGreetings.pending, (state) => {
        state.isLoading = true;
        })
        .addCase(getGreetings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.greeting;
        })
        .addCase(getGreetings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.greeting;
        });
    },
})

export default greetingSlice.reducer;
