import React from "react";
import { Container, Box, Typography } from "@mui/material";

import img from "../../assets/avatar.jpg";
function Profile() {
  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3 }}>
      <Box style={{ textAlign: "center" }}>
        <img
          src={img}
          alt="Mô tả hình ảnh"
          style={{
            width: 300,
            height: 400,
            borderRadius: "50%",
            minWidth: "150px",
            minHeight: "150px",
            textAlign: "center",
          }}
        />
      </Box>

      <Typography style={{ textAlign: "center", marginTop: 10 }}>
        Họ tên: Phùng Hu Nu
      </Typography>

      <Typography style={{ textAlign: "center", marginTop: 10 }}>
        MSV: B20DCCN464
      </Typography>

      <Typography style={{ textAlign: "center", marginTop: 10 }}>
        Lớp: D20HTTT03
      </Typography>
    </Container>
  );
}

export default Profile;