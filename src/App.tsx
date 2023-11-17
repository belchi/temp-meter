import React, {useEffect, useState} from 'react';
import './App.css';
import {styled} from '@mui/material/styles';
import {Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import TempChart from "./components/TempChart";
import {Feed, Items} from "./requestData";
import {formatDate, formatTemperature} from "./util/formatter";

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const endpoint = 'https://api.thingspeak.com/channels/2280057/fields/1.json?timezone=Europe%2FStockholm&results=50';

function App() {

    const [items, setItems] = useState<Items>();
    const [chartData, setChartData] = useState<Feed[]>();

    useEffect(() => {
        (async () => {
            const data = await fetch(endpoint)
                .then(res => res.json());
            setItems({
                channel: data.channel,
                feeds: data.feeds.sort((a: Feed, b: Feed) => b.entry_id - (a.entry_id))
            });
            setChartData(data.feeds.slice(0, 10).reverse());
        })()
    }, [])

    return (
        <Container maxWidth="sm">
            {TempChart(chartData || [])}
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Tid</TableCell>
                            <TableCell>Temp</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items?.feeds.map((item) => (
                            <StyledTableRow key={item.entry_id}>
                                <TableCell
                                    style={{textTransform: 'capitalize'}}>{formatDate(item.created_at)}</TableCell>
                                <TableCell>{formatTemperature(item.field1)}</TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default App;
