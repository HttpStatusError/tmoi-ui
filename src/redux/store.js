import {configureStore} from "@reduxjs/toolkit";
import commonSlice from "./commonSlice";

export const store = configureStore({
  reducer: {
    commonSlice: commonSlice
  },
})

export default store;