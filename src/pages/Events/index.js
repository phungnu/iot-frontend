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

function Events({lightControlEvent, fanControlEvent}) {
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
