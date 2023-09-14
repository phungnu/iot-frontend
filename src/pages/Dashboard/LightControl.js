import {
    Box,
    IconButton,
    Card,
    Stack,
    Switch,
    Typography,
    CardContent,
  } from "@mui/material";
  import React, { useState } from "react";
  import LightbulbIcon from "@mui/icons-material/Lightbulb";
  import LightOn from "../../assets/blub-on-removebg-preview.png";
  import LightOff from "../../assets/blub-off-removebg-preview.png";
  import { makeStyles } from "@mui/styles";
  import { useTheme } from "@mui/material/styles";
  import dayjs from "dayjs";
  
  function LightControl({ setLightControlEvent, statusLight, setStatusLight }) {
    const theme = useTheme();
  
    const classes = styles();
  
    const handleChange = (event) => {
      setLightControlEvent((prev) => [
        ...prev,
        {
          mode: event.target.checked ? "ON" : "OFF",
          time: dayjs().format("HH:mm:ss DD-MM-YYYY"),
        },
      ]);
      setStatusLight(event.target.checked);
    };
  
    return (
      <Card className={classes.item}>
        <CardContent>
          <Box className={classes.iconWrapper}>
            <IconButton onClick={() => setStatusLight(!statusLight)}>
              <img
                  src={statusLight ? LightOn : LightOff}
                  alt="Fan icon"
                  style={{ width: 75, height: 75, color: "red" }}
              />
            </IconButton>
          </Box>
  
          <Stack direction="row" alignItems="center" justifyContent="center">
            <Typography>OFF</Typography>
            <Switch
              checked={statusLight}
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
  }));
  
  export default LightControl;
  