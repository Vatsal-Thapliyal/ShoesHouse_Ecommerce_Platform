import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentuser : null,
        isfetching: false,
        error: false
    },
    reducers: {
        loginStart: (state) => {
            state.isfetching=true;
        },
        
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentuser = action.payload;
        }, 

        loginFailure: (state) => {
            state.fetching = false;
            state.error = true;
        }
    }
});

export const { loginStart, loginSuccess, loginFailure } = userSlice.actions;
export default userSlice.reducer;
