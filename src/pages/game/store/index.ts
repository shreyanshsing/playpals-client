import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { serverBaseUrl } from "../../../config/data";

interface IinitialState {
  game: any;
  loading: boolean;
  error: string;
  server: any;
  player: any;
}

const initialState: IinitialState = {
  game: null,
  loading: false,
  error: "",
  server: null,
  player: null,
};

export const fetchGame = createAsyncThunk(
  "game/fetchGame",
  async (gameId: string) => {
    const response = await axios(serverBaseUrl + `/game/${gameId}`);
    return response.data;
  }
);

export const fetchServer = createAsyncThunk(
  "game/fetchServer",
  async (serverId: string) => {
    const response = await axios(serverBaseUrl + "/game-server/" + serverId);
    return response.data;
  }
);

const gameReducer = createSlice({
  name: "game",
  initialState: initialState,
  reducers: {
    selectPlayer: (state, action) => {
      state.player = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGame.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchGame.fulfilled, (state, action) => {
      state.loading = false;
      state.game = action.payload;
    });
    builder.addCase(fetchGame.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "";
    });
    builder.addCase(fetchServer.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchServer.fulfilled, (state, action) => {
      state.loading = false;
      state.server = action.payload;
    });
    builder.addCase(fetchServer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "";
    });
  },
});

interface IRootState {
  game: IinitialState;
}

export const { selectPlayer } = gameReducer.actions;

export const selectGame = (state: IRootState) => state.game;

export default gameReducer.reducer;
