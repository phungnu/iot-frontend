import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import MenuAppBar from "./components/MenuAppBar";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Events from "./pages/Events";
import LightEvent from "./pages/Events/LightEvent";
import FanEvent from "./pages/Events/FanEvent";
import DataSensor from "./pages/DataSensor";

import dayjs from "dayjs";
import { saveToLocalStorage } from "./utils";

function App() {
  const storedTempList = JSON.parse(localStorage.getItem("tempList")) || [30];
  const storedHumidList = JSON.parse(localStorage.getItem("humidList")) || [50];
  const storedLightList = JSON.parse(localStorage.getItem("lightList")) || [68];

  const [tempList, setTempList] = useState(storedTempList);
  const [humidList, setHumidList] = useState(storedHumidList);
  const [lightList, setLightList] = useState(storedLightList);

  const [statusLight, setStatusLight] = useState(true)
  const [statusFan, setStatusFan] = useState(true)

  const [lightControlEvent, setLightControlEvent] = useState([
    { mode: "ON", time: dayjs().format("HH:mm:ss DD-MM-YYYY") },
  ]);
  const [fanControlEvent, setFanControlEvent] = useState([
    { mode: "ON", time: dayjs().format("HH:mm:ss DD-MM-YYYY") },
  ]);

  useEffect(() => {
    saveToLocalStorage("tempList", [30, 68, 60]);
    saveToLocalStorage("humidList", [80, 20, 40]);
    saveToLocalStorage("lightList", [68, 30, 50]);

    return () => {
      localStorage.removeItem("tempList");
      localStorage.removeItem("humidList");
      localStorage.removeItem("lightList");
    };
  }, []);

  return (
    <div>
      <CssBaseline />

      <MenuAppBar />

      {/* Router  */}
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              tempList={tempList}
              humidList={humidList}
              lightList={lightList}
              setTempList={setTempList}
              setHumidList={setHumidList}
              setLightList={setLightList}
              setLightControlEvent={setLightControlEvent}
              setFanControlEvent={setFanControlEvent}
              statusFan={statusFan}
              statusLight={statusLight}
              setStatusFan={setStatusFan}
              setStatusLight={setStatusLight}
            />
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/data-sensor"
          element={
            <DataSensor
              tempList={tempList}
              humidList={humidList}
              lightList={lightList}
            />
          }
        />
        <Route path="/events" element={<Events lightControlEvent={lightControlEvent} fanControlEvent={fanControlEvent}/>}>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
