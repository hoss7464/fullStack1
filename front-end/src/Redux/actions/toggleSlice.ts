import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
//-------------------------------------------------------------------------------------------------------
interface ToggleState {
  toggles: Record<string, boolean>;
}

const initialState: ToggleState = {
  toggles: {
    sidebar: false,
  },
};


export const toggleSlice = createSlice({
  name: "toggle",
  //States : 
  initialState,
  reducers: {
    //Toggle function on click :
    clickToggle: (state, action: PayloadAction<string>) => {
      const toggleKey = action.payload;
      state.toggles[toggleKey] = !state.toggles[toggleKey];
    },
    //Toggle function on hover :
    hoverEnableToggle : (state, action: PayloadAction<string>) => {
      const id = action.payload
      state.toggles[id] = true
    },
    hoverDisableToggle : (state, action: PayloadAction<string>) => {
      const id = action.payload
      state.toggles[id] = false
    }
  },
});

export const { clickToggle, hoverEnableToggle, hoverDisableToggle } = toggleSlice.actions;

export default toggleSlice.reducer;