import React from "react";
import { Box } from "@mui/material";
import StickyHeadTable from "../../components/StickyHeadTable";

function FanEvent({ fanControlEvent }) {
  return (
    <Box style={{ marginTop: 20, paddingLeft:20 }}>
      <h4>Fan</h4>
      <StickyHeadTable data={fanControlEvent} />
    </Box>
  );
}

export default FanEvent;
