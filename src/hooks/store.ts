import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  ws: WebSocket | null;
}

const initialState: IState = {
  ws: null,
};

const hooksReducer = createSlice({
  name: "hooks",
  initialState: initialState,
  reducers: {
    setWebSocket: (state: IState, action: PayloadAction<WebSocket | null>) => {
        console.log("Setting WebSocket instance in Redux", action.payload);
      state.ws = action.payload;
    },
  },
});

interface IRootState {
  hooks: IState;
}

export const selectWebSocket = (state: IRootState) => state.hooks;

export const { setWebSocket } = hooksReducer.actions;

export default hooksReducer.reducer;
