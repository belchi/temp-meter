import React, {useEffect, useState} from 'react';
import './App.css';
import {styled} from '@mui/material/styles';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {DateTime} from 'luxon'

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

interface Channel {
    id: number,
    name: string,
    field1: string,
    created_at: string,
    updated_at: string
}

interface Feed {
    entry_id: number,
    created_at: string,
    field1: string
}

interface Items {
    channel: Channel,
    feeds: Feed[]
}

const endpoint = 'https://api.thingspeak.com/channels/2280057/fields/1.json?timezone=Europe%2FStockholm';

const formattedDate = (dateInput: string) => {
    const dateTime = DateTime.fromISO(dateInput, {zone: 'Europe/Stockholm'}).setLocale('sv');
    return dateTime.toFormat('ccc HH:mm');

}

function App() {

    const [items, setItems] = useState<Items>();

    useEffect(() => {
        (async () => {
            const data = await fetch(endpoint)
                .then(res => res.json());
            setItems({
                channel: data.channel,
                feeds: data.feeds.sort((a: Feed, b: Feed) => b.entry_id - (a.entry_id))
            });
        })()
    }, [])

    return (
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
                                style={{textTransform: 'capitalize'}}>{formattedDate(item.created_at)}</TableCell>
                            <TableCell>{item.field1.replace('.', ',')} °C</TableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default App;
