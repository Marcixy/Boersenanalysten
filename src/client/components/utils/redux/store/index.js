import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = { counter: 0 };

const counterSlice = createSlice({
    name: 'counter',
    initialState: initialState,
    reducers: {
        increment(state) {
            state.counter++;
        },
        decrement(state) {
            state.counter--;
        },
        increase(state, action) {
            state.counter += action.payload;
        }
    }
});

const store = configureStore({
    reducer: counterSlice.reducer
});

export const counterActions = counterSlice.actions;

export default store;