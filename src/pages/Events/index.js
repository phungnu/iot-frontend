import React, { useEffect, useState} from "react";
import {
  Container,
  Box,
  Typography,
  Breadcrumbs,
  useTheme,
} from "@mui/material";
import { Link, Outlet, useLocation } from "react-router-dom";
import LightEvent from "./LightEvent";
import FanEvent from "./FanEvent";
import {Row, Col} from 'antd'
import axios from 'axios';
import { config } from "../../config";

function Events() {

  const [lightControlEvent, setLight] = useState([{status: '', timestamp: ''}]);

  const [fanControlEvent, setFan] = useState([{status: '', timestamp: ''}]);
  useEffect(() => {
      const getLightData = async() => {
          await axios.get(`${config.host_api}/ledstatus/getAll`)
              .then(res => {
                  let data = res.data;
                  if (data.length > 0)
                    setLight(data);
              })
              .catch(err => console.log(err))
      }

      const getFanData = async() => {
        await axios.get(`${config.host_api}/fanstatus/getAll`)
            .then(res => {
                let data = res.data;
                if (data.length > 0)
                  setFan(data);
            })
            .catch(err => console.log(err))
    }
    getLightData()
    getFanData()
  }, []);

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3 }}>
      <Row>
        <Col span={12}>
          <LightEvent lightControlEvent={lightControlEvent} />
        </Col>
        <Col span={12}>
          <FanEvent fanControlEvent={fanControlEvent} />
        </Col>
      </Row>
    </Container>
  );
}

export default Events;
