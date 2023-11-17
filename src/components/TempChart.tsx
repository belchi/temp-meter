import React from 'react';
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import {Feed} from "../requestData";
import {formatDate} from "../util/formatter";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
    },
};

const TempChart = (data: Feed[]) => {
    const chartData = {
        labels: data.map((item: Feed) => formatDate(item.created_at)),
        datasets: [
            {
                label: 'Temp',
                data: data.map((item: Feed) => (item.field1)),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return <Line options={options} data={chartData}/>;
};

export default TempChart;
