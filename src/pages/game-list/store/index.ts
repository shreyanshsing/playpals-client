import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serverBaseUrl } from "../../../config/data";
import axios from "axios";

interface InitialState {
    games: any[];
    loading: boolean;
    error: any;
    selectedGame: any;
}

const initialState: InitialState = {
    games: [],
    loading: false,
    error: null,
    selectedGame: null
};

export const fetchGameList = createAsyncThunk(
    "gameList/fetchGameList",
    async () => {
        const response = await axios(serverBaseUrl + "/game");
        return response.data;
    }
);

const gameListReducer = createSlice({
    name: "gameList",
    initialState: initialState,
    reducers: {
        selectGame(state, action) {
            state.selectedGame = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGameList.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchGameList.fulfilled, (state, action) => {
            state.loading = false;
            state.games = action.payload;
        });
        builder.addCase(fetchGameList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
    }
});

interface RootState {
    gameList: InitialState;
}

export const { selectGame } = gameListReducer.actions;

export const selectGameList = (state: RootState) => state.gameList;

export default gameListReducer.reducer;

