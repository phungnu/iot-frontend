import {
    Box,
    Card,
    CardContent,
    IconButton,
    Stack,
    Switch,
    Typography,
  } from "@mui/material";
  import React, { useState } from "react";
  import { makeStyles } from "@mui/styles";
  import Fan from "../../assets/fan-manh-removebg-preview.png";
  import { useTheme } from "@mui/material/styles";
  import dayjs from "dayjs";
  
  function FanControl({ setFanControlEvent, statusFan, setStatusFan }) {
    const theme = useTheme();
  
    const classes = styles();
  
    const handleChange = (event) => {
      setFanControlEvent((prev) => [
        ...prev,
        {
          mode: event.target.checked ? "ON" : "OFF",
          time: dayjs().format("HH:mm:ss DD-MM-YYYY"),
        },
      ]);
      setStatusFan(event.target.checked);
    };
  
    return (
      <Card className={classes.item}>
        <CardContent>
          <Box className={classes.iconWrapper}>
            <IconButton
              className={statusFan ? classes.rotatingIcon : ""}
              onClick={() => setStatusFan(!statusFan)}
            >
            <img
                src={Fan}
                alt="Fan icon"
                style={{ width: 75, height: 75, color: "red" }}
            />
            </IconButton>
          </Box>
  
          <Stack direction="row" alignItems="center" justifyContent="center">
            <Typography>OFF</Typography>
            <Switch
              checked={statusFan}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
            <Typography>ON</Typography>
          </Stack>
        </CardContent>
      </Card>
    );
  }
  
  const styles = makeStyles((theme) => ({
    item: {
      height: "100%",
    },
    iconWrapper: {
      display: "flex",
      justifyContent: "center",
    },
    rotatingIcon: {
      animation: "spin 2s linear infinite",
    },
  }));
  
  export default FanControl;
  