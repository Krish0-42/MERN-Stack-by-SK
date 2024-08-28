import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"

const counterLogic = (state = 0, action) => { // state and action 
    switch(action.type){
        case "add":
            return state + 1;
            break;

        case "sut":
            return state - 1;
            break;

    }
    // if switch is not match the return below
    return state;
}

export const myStore = configureStore({ // configureStore create a store 
    reducer:{
        "counter": counterLogic
        // you can add more code if you see fit.
    }
})
