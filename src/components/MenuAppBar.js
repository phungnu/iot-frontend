import React, { useEffect, useState } from "react";
import {
  AppBar,
  Container,
  Toolbar,
  List,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export default function MenuAppBar() {

  const navigate = useNavigate();

  const [value, setValue] = React.useState(0);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Tabs
              onChange={handleChange}
              centered
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
            >
              <List>
                {[
                  { name: "Dashboard", route: "/" },
                  { name: "Profile",route: "/profile"},
                  { name: "Data Sensor", route: "/data-sensor"},
                  { name: "Events", route: "/events",},
                ].map((val, idx) => (
                  <Tab label={val.name} onClick={() => {navigate(val.route); handleChange(idx)}} style={{fontWeight: (idx==value)?700:300, fontSize: (idx==value)?18:14}}>
                  </Tab>
                ))}
              </List>
            </Tabs>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
