import React from "react";
import { Box } from "@mui/material";
import CustomTable from "./CustomTable";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { config } from '../../config'

export default function DataSensor({ tempList, humidList, lightList }) {
    const [data, setData] = useState([{id: '', temperature: "", humidity: "", light: "", timestamp: '' }]);
    useEffect(() => {
        const getSensorData = async() => {
            await axios.get(`${config.host_api}/mqtt/getAll`)
                .then(res => {
                    let data = res.data;
                    if (data.length > 0)
                        setData(data);
                })
                .catch(err => console.log(err))
        }
        getSensorData()
    }, []);
    return (
        <Box style={{ maxWidth: 1488, marginLeft: 'auto', marginRight: 'auto', margintop: 40}}>
        <CustomTable data={data} />
        </Box>
    );
}