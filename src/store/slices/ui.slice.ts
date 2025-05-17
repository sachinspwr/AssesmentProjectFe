import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';

interface UIState {
  isSidebarVisible: boolean;
  isSidebarExpanded: boolean;
}

const initialState: UIState = {
  isSidebarVisible: true,
  isSidebarExpanded: true,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setIsSidebarVisible: (state, action: PayloadAction<boolean>) => {
      console.log("setting to", action.payload)
      state.isSidebarVisible = action.payload;
    },
    setIsSidebarExpanded: (state, action: PayloadAction<boolean>) => {
      state.isSidebarExpanded = action.payload;
    },
  },
});

// Action exports (grouped for better DX)
export const uiActions = uiSlice.actions;
export const { setIsSidebarVisible, setIsSidebarExpanded } = uiSlice.actions;

// Selectors
export const selectIsSidebarVisible = (state: RootState) => state.ui.isSidebarVisible;
export const selectIsSidebarExpanded = (state: RootState) => state.ui.isSidebarExpanded;

// Reducer export
export default uiSlice.reducer;