import {
    Box,
    IconButton,
    Card,
    Stack,
    Switch,
    Typography,
    CardContent,
  } from "@mui/material";
  import React, { useState, useEffect } from "react";
  import LightOn from "../../assets/blub-on-removebg-preview.png";
  import LightOff from "../../assets/blub-off-removebg-preview.png";
  import { makeStyles } from "@mui/styles";
  import axios from 'axios';
  import { config } from "../../config";
  
  function LightControl() {
     const classes = styles();

     const [ statusLight, setStatusLight] = useState(false);
     useEffect(() => {
          const getSensorData = async() => {
          await axios.get(`${config.host_api}/ledstatus/getAll`)
               .then(res => {
                    let data = res.data;
                    if (data.length > 0) {
                      console.log(data)
                      if ( data[data.length-1].status == 'LED ON')
                      setStatusLight(true);
                    }
                      
               })
               .catch(err => console.log(err))
          }
          getSensorData()
     }, []);

     const senMQTT = async(message) => {
          await axios.post(`${config.host_api}/mqtt/send-data`, {
               topic: 'LED',
               message: message
          })
               .then(res => {
                    console.log('OK')
               })
               .catch(err => console.log(err))
     }

    const handleChange = async (event) => {
      
     setStatusLight(!statusLight);

          const message = statusLight ? 'LED OFF' : 'LED ON';

          await senMQTT(message)
     };
  
    return (
      <Card className={classes.item}>
        <CardContent>
          <Box className={classes.iconWrapper}>
            <IconButton onClick={() => setStatusLight(!statusLight)}>
              <img
                  src={statusLight ? LightOn : LightOff}
                  alt="Light icon"
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
  