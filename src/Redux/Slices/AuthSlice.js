import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../Http/Settings';

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
    const { data } = await axios.post('/api/login', params);
    return data;
});

export const fetchRegister = createAsyncThunk('register/fetchRegister', async (params) => {
    const { data } = await axios.post('/api/register', params);
    return data;
});

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const { data } = await axios.get('/api/me');
    console.log(data.token);
    return data;
});

export const fetchAuthUserStatus = createAsyncThunk('auth/fetchAuthUserStatus', async () => {
    const { data } = await axios.get('/api/me');
    return data;
});

export const sendConfirmationEmail = createAsyncThunk(
  'auth/sendConfirmationEmail',
  async () => {
    const { data } = await axios.get('/api/register/confirm');
    return data;
  }
);

export const resendConfirmationEmail = createAsyncThunk(
  'auth/resendConfirmationEmail',
  async () => {
    const { data } = await axios.post('/api/register/resendConfirmToken');
    return data;
  }
);

const initialState = {
    data: null,
    status: 'loading',
    userStatus: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.status = 'idle'; 
            state.data = null;
            state.userStatus = null;
        },
    },
    extraReducers(builder) {
        // Login
        builder
            .addCase(fetchAuth.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchAuth.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.data = action.payload;
            })
            .addCase(fetchAuth.rejected, (state) => {
                state.status = 'error';
                state.data = null;
            });

        // Register
        builder
            .addCase(fetchRegister.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.data = action.payload;
            })
            .addCase(fetchRegister.rejected, (state) => {
                state.status = 'error';
                state.data = null;
            });

        // Token Me
        builder
            .addCase(fetchAuthMe.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchAuthMe.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.data = action.payload;
            })
            .addCase(fetchAuthMe.rejected, (state) => {
                state.status = 'error';
                state.data = null;
            });

        // User Status
        builder
            .addCase(fetchAuthUserStatus.pending, (state) => {
                state.status = 'loading';
                state.userStatus = null;
            })
            .addCase(fetchAuthUserStatus.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.userStatus = action.payload;
            })
            .addCase(fetchAuthUserStatus.rejected, (state) => {
                state.status = 'error';
                state.userStatus = null;
            });

        // Send Confirmation Email
        builder
            .addCase(sendConfirmationEmail.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(sendConfirmationEmail.fulfilled, (state) => {
                state.status = 'loaded';
            })
            .addCase(sendConfirmationEmail.rejected, (state) => {
                state.status = 'error';
            });

        // Resend Confirmation Email
        builder
            .addCase(resendConfirmationEmail.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(resendConfirmationEmail.fulfilled, (state) => {
                state.status = 'loaded';
            })
            .addCase(resendConfirmationEmail.rejected, (state) => {
                state.status = 'error';
            });
    },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);
export const selectUserStatus = (state) => state.auth.userStatus;

export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
