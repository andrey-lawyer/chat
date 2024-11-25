import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {ApiService} from "../service/api";


export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (updateUser, { rejectWithValue }) => {
        try {
            await ApiService.updateProfileUser(updateUser);
            // if successful, the session is terminated
            return null;
        } catch (error) {
            const message =
                error.response?.data?.message || error.message || 'Something went wrong';
            return rejectWithValue(message);
        }
    }
);


export const currentUser = createAsyncThunk('user/currentUser', async (_, { rejectWithValue }) => {
    try {
        const user = await ApiService.checkAuth();
        return user;
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.message || 'Failed to getting current user');
        } else {
            return rejectWithValue(error.message || 'Something went wrong');
        }
    }
});

export const logoutUser = createAsyncThunk('user/logoutUser', async ( _, {rejectWithValue }) => {

    try {
        await ApiService.logout();
        return null;

    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.message || 'Failed to logout user');
        } else {
            return rejectWithValue(error.message || 'Something went wrong');
        }
    }
});

const initialState = {
    user: null,
    error: null,
    loading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,

    extraReducers: (builder) => {
        builder
            .addCase(currentUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(currentUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(currentUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                console.error('Failed to fetch user:', action.payload);
            })


            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                console.error('Failed to fetch user:', action.payload);
            })


            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
         .addCase(logoutUser.fulfilled, (state) => {
            state.user = null;
        })
            .addCase(logoutUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            console.error('Failed to logout user:', action.payload);
        })
    },
});


export default userSlice.reducer;

