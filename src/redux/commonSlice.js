import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  disableHiddenHeader: false,
  hiddenHeader: false,
  stickySidebar: false,
  articlePageSticky: false,
  showLogin: false,
}

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    changeShowLogin: (state, action) => {
      state.showLogin = action.payload
    },
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
  changeShowLogin,
  changeDisableHiddenHeader,
  changeHiddenHeader,
  changeStickySidebar,
  changeArticlePageSticky
} = commonSlice.actions

export default commonSlice.reducer
