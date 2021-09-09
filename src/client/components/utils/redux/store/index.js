import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialUserState = { userid: "", email: "", username: "", shareCounter: "" };

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        setUserData(state, action) {
            state.user = action.payload;
        },
    }
});

const store = configureStore({
    reducer: userSlice.reducer
});

export const userActions = userSlice.actions;

export default store;