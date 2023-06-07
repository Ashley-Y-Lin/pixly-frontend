import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./routes-nav/Navigation";
import RoutesList from "./routes-nav/RoutesList";


/** Pix.ly application.
 *
 * App -> { Navigation, Routes }
 */


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navigation />
        <RoutesList />
      </div>
    </BrowserRouter>
  );
}

export default App;
