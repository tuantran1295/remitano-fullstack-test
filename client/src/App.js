import React from "react";
import { Route, Routes,BrowserRouter} from "react-router-dom";
import { routes } from "./routes";
import { RootStoreProvider } from "./store/rootStore";

function App() {

  return (
    <RootStoreProvider>
      <div className="w-screen h-screen">
        <BrowserRouter>
          <Routes>
            {routes.map((route, index) => {
              return (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  element={route.component}
                />
              );
            })}
          </Routes>
        </BrowserRouter>
      </div>
    </RootStoreProvider>
  );
}

export default App;
