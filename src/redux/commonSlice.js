import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  reduxVal: 'Hello World!'
}

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    changeReduxVal: (state, action) => {
      state.reduxVal = action.payload
    }
  }
})

export const {
  changeReduxVal
} = commonSlice.actions

export default commonSlice.reducer
