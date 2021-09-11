import { createSlice } from '@reduxjs/toolkit';

const initialUserState = {
    isLoggedIn: false,
    userid: "",
    email: "",
    username: "",
    shareCounter: 0
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        setUserData(state, action) {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.userid = action.payload.userid;
            state.email = action.payload.email;
            state.username = action.payload.username;
            state.shareCounter = action.payload.shareCounter;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.userid = "";
            state.email = "";
            state.username = "";
            state.shareCounter = 0;
        }
    }
});

export const userActions = userSlice.actions;

export default userSlice;