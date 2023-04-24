//import React from "react";
import '../index.css';
import { Line, Bar } from 'react-chartjs-2';
import { colors } from '../colors/colors'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { ILine } from '../interfaces/ILine';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


type LongData = { data: ILine };

export const SingleLineCard = (data: LongData) => {
    const labels = data.data.x
    var longData = {
        labels,
        datasets: [
            {
                label: data.data.label,
                data: data.data.y,
                borderColor: [colors.mitreBlue],
                backgroundColor: [colors.mitreBlue],
            }
        ]
    }

    var options = {
        legend: {
            display: true,
            labels: {
                fontSize: window.innerWidth > 350 ? 30 : 10
            }
        },
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            x: {
                ticks: {
                    autoSkip: true,
                    maxRotation: 50,
                    minRotation: 30,
                    font: {
                        size: 12
                    }
                }
            },
            y: {
                ticks: {
                    font: {
                        size: 12
                    }
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text: data.data.title,
                font: function (context: any) {
                    var width = context.chart.width;
                    var size = Math.round(width / 128) + 8;

                    return {
                        weight: 'bold',
                        size: size
                    };
                }
            }

        }
    }

    var plugins = [{
        beforeDraw: function (c: any) {
            var chartHeight = c.height;
            c.options.scales.x.ticks.font.size = (chartHeight / 64) + 4;
            c.options.scales.y.ticks.font.size = (chartHeight / 64) + 4;
            c.options.legend.labels.fontsize = (chartHeight / 64) + 4;
            //c.scales['y-axis-0'].options.x.ticks.font.size = chartHeight * 100;
        }
    }]

    return (
        <Line data={longData}
            height={500}
            width={800}
            options={options}
            plugins={plugins} />

    );
};





