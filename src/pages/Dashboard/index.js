import React, { useEffect, useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import Header from "./Header";
import CustomChart from "./CustomChart";
import LightControl from "./LightControl";
import FanControl from "./FanControl";
import axios from "axios";

import { config } from "../../config";



const init = [{
    temperature: 0,
    humidity: 0,
    light: 0
}]


function Dashboard() {

    const [sensorData, setSensorData] = useState(init)

    useEffect(() => {

        const getSensorData = async() => {
            await axios.get(`${config.host_api}/mqtt/getAll`)
                .then(res => {
                    let data = res.data;
                    console.log(data)
                    if (data.length > 0)
                        setSensorData(data.slice(-30));
                })
                .catch(err => console.log(err))
        }

        const intervalId = setInterval(() => {
            getSensorData();
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };

        getSensorData();

    }, []);

    return (
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          <Container maxWidth="xl" sx={{ paddingTop: 3 }}>
            <Header
              temp={ sensorData[sensorData.length - 1].temperature}
              humid={ sensorData[sensorData.length - 1].humidity}
              light = { sensorData[sensorData.length - 1].light }
            />
    
            <Grid container spacing={3} sx={{ paddingTop: 3 }}>
              {/* Chart  */}
              <Grid item xs={12} sm={12} md={8} order={{ xs: 2, md: 1 }}>
                <CustomChart
                  sensorData={sensorData}
                />
              </Grid>
    
              {/* Control  */}
              <Grid item xs={12} sm={12} md={4} order={{ xs: 1, md: 2 }}>
                <Grid container spacing={3}>
                  <Grid item xs={6} sm={6} md={12}>
                    <LightControl />
                  </Grid>
    
                  <Grid item xs={6} sm={6} md={12}>
                    <FanControl />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Box>
      );
}

export default Dashboard;