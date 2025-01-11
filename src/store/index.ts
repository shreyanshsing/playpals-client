import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers";
import { configureStore } from "@reduxjs/toolkit";
import { createTransform } from "redux-persist";

const transformState = createTransform(
    (inboundState: any) => {
        const {game, ...rest} = inboundState;

        //remove player from game 
        if(game) {
            const {player, ...gameWithoutPlayer} = game;
            return {
                ...rest,
                game: gameWithoutPlayer
            };
        }
        return rest;
    },
    (outboundState) => {
        return outboundState;
    }
);

const persistConfig = {
    key: 'root',
    storage,
    transform: [transformState]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
    
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;