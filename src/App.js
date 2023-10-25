import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import MenuAppBar from "./components/MenuAppBar";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Events from "./pages/Events";
import DataSensor from "./pages/DataSensor";


function App() {

  return (
    <div>
      <CssBaseline />

      <MenuAppBar />

      {/* Router  */}
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard/>
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/data-sensor"
          element={
            <DataSensor />
          }
        />
        <Route path="/events" element={<Events/>}>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
