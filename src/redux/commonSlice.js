import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  hiddenHeader: false,
  stickySidebar: false,
}

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    changeHiddenHeader: (state, action) => {
      state.hiddenHeader = action.payload
    },
    changeStickySidebar: (state, action) => {
      state.stickySidebar = action.payload
    }
  }
})

export const {
  changeHiddenHeader,
  changeStickySidebar
} = commonSlice.actions

export default commonSlice.reducer
