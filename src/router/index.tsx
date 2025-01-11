import { ThemeProvider } from "@emotion/react";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import theme from "../theme/theme";
import Homepage from "../pages/homepage";
import GameList from "../pages/game-list";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../store";
import { Routes as routes } from "./paths";
import Game from "../pages/game";

const RouterComponent = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path={routes.HOME} element={<Homepage />} />
              <Route path={routes.GAME_LIST} element={<GameList />} />
              <Route path={routes.GAME+ ':gameId'} element={<Game />} />
              <Route path="*" element={<Homepage />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default RouterComponent;
