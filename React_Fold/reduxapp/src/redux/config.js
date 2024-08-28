import { configureStore } from "@reduxjs/toolkit";

const counterLogic = (state = 0, action) => {
    switch(action.type) {
        case "add":
            return state + 1;
        case "sub":
            return state - 1;
        default:
            return state;
    }
    return state;
}

export const myStore = configureStore({
    reducer: {
        "counter": counterLogic
        // you can add more code if you see fit
    }
});
