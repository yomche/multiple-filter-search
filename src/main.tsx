import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import { AppProvider } from "./providers/appProvider.tsx";

import "./styles/globals.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router basename="/">
      <AppProvider>
        <App />
      </AppProvider>
    </Router>
  </React.StrictMode>
);
