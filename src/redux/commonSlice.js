import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  disableHiddenHeader: false,
  hiddenHeader: false,
  stickySidebar: false,
  articlePageSticky: false,
}

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    changeDisableHiddenHeader: (state, action) => {
      state.disableHiddenHeader = action.payload
    },
    changeHiddenHeader: (state, action) => {
      state.hiddenHeader = action.payload
    },
    changeStickySidebar: (state, action) => {
      state.stickySidebar = action.payload
    },
    changeArticlePageSticky: (state, action) => {
      state.articlePageSticky = action.payload
    }
  }
})

export const {
  changeDisableHiddenHeader,
  changeHiddenHeader,
  changeStickySidebar,
  changeArticlePageSticky
} = commonSlice.actions

export default commonSlice.reducer
