import {
    Box,
    Card,
    CardContent,
    IconButton,
    Stack,
    Switch,
    Typography,
  } from "@mui/material";
  import React, { useState, useEffect } from "react";
  import { makeStyles } from "@mui/styles";
  import Fan from "../../assets/fan-manh-removebg-preview.png";
  import axios from 'axios';
  import { config } from '../../config';
  
  function FanControl() {

    const [ statusFan, setStatusFan] = useState(false);
     useEffect(() => {
          const getSensorData = async() => {
          await axios.get(`${config.host_api}/fanstatus/getAll`)
               .then(res => {
                    let data = res.data;
                    if (data.length > 0) {
                      console.log(data)
                      if ( data[data.length-1].status == 'FAN ON')
                      setStatusFan(true);
                    }
                      
               })
               .catch(err => console.log(err))
          }
          getSensorData()
     }, []);

     const senMQTT = async(message) => {
          await axios.post(`${config.host_api}/mqtt/send-data`, {
               topic: 'FAN',
               message: message
          })
               .then(res => {
                    console.log('OK')
               })
               .catch(err => console.log(err))
     }

    const handleChange = async (event) => {
      
     setStatusFan(!statusFan);

          const message = statusFan ? 'FAN OFF' : 'FAN ON';

          await senMQTT(message)
     };
  
    const classes = styles();
  
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
  