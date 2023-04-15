//import React from "react";
import '../index.css';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { IBar } from '../interfaces/IBar';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

type BarData = { data: IBar };

export const HorizontalBarCard = (data: BarData) => {
    var labels = data.data.labels
    var datasets = data.data.datasets
    var propData = {
        labels: labels,
        datasets: datasets
    }

    var options = {
        indexAxis: 'y' as const,
        elements:{
            bar: {
                borderWidth: 2,
            }
        },
        responsive: true,
        
        plugins: {
            legend: {
                position: 'right' as const,
            },
            title: {
                display: true,
                text: data.data.title,
            }
        }
    }
    return (
        <Bar data={propData}
            height={500}
            width={800}
            options={options} />

    );
};
