import { combineReducers } from "@reduxjs/toolkit";

export default combineReducers({
    // Add reducers here
    gameList: require("../pages/game-list/store").default,
    game: require("../pages/game/store").default,
    hooks: require("../hooks/store").default,
})