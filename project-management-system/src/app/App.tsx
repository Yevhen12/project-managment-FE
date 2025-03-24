import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { routeConfig } from "./config/routesConfig";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {Object.values(routeConfig).map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
