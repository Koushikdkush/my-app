import { createSlice } from "@reduxjs/toolkit";
export const initialState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
}

const authSlice = createSlice({
    name: 'authState', initialState,
    reducers: {
        setToken: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },

        logout: (state) => {
            state.user = null;
            localStorage.removeItem('user')
        }
    }
});

export const { setToken, logout } = authSlice.actions

export default authSlice.reducer;