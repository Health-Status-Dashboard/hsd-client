import * as React from 'react'
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useEffect, useRef, useState } from "react";
import { Chart } from 'react-chartjs-2'
import * as ChartGeo from "chartjs-chart-geo";
import {
    Chart as ChartJS,
    CategoryScale,
    Tooltip,
    Title,
    Legend
} from "chart.js";

import { SummaryCard } from '../cards/SummaryCard'
import { BarCard } from '../cards/BarCard'
import { MiniBarCard } from '../cards/MiniBarCard'
import { ISummary } from '../interfaces/ISummary';
import { IBar } from '../interfaces/IBar';
import { initRecentYearDCModel, getRecentYearDCModelAllCauses, getRecentYearDCModelAlzheimer, getRecentYearDCModelCovid19, getRecentYearDCModelCancer, getRecentYearDCModelLiver, getRecentYearDCModelRespiratory, getRecentYearDCModelDiabetes, getRecentYearDCModelHeart, getRecentYearDCModelHIV, getRecentYearDCModelHypertension, getRecentYearDCModelFluPneu, getRecentYearDCModelKidney, getRecentYearDCModelParkinsons, getRecentYearDCModelPneumonionitis, getRecentYearDCModelSepticimia, getRecentYearDCModelStroke, initRecent3YearDCModel, getRecent3YearDCModel } from '../endpoints/RegionsPageServerURLs'
import { colors, gradient } from '../colors/colors'

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    ChartGeo.ChoroplethController,
    ChartGeo.ProjectionScale,
    ChartGeo.ColorScale,
    ChartGeo.GeoFeature
);

//Rename data into displayable words such as new_hampshire --> New Hampshire
function renameStateKeys(data: any) {
    for (var k in data) {
        if (data.hasOwnProperty(k)) {
            if (k.substring(0, 4) === "rate") {
                var spaced = k.slice(5).replace(/_/g, " ")
                var words = spaced.split(" ");
                var newK = words.map((word) => {
                    return word[0].toUpperCase() + word.substring(1);
                }).join(" ");
                data[newK] = data[k]
                delete data[k]
            }
        }
    }
    return data
}

export default function Regions() {

    const chartRef = useRef();
    const [geoData, setGeoData] = useState<any>([]);
    const [stateData, setStateData] = useState<any>([]);

    const regionSumm: ISummary = {
        title: "Deaths per 100,000 Residents (2022)",
        headers: [
            {
                value: <strong>{stateData.cause_of_death}</strong>,
                label: "Cause of Death"
            }
        ]
    }

    const sexSumm: ISummary = {
        title: "By Sex",
        headers: [
            {
                value: <strong>{stateData.cause_of_death}</strong>,
                label: "Cause of Death"
            }
        ]
    }

    const ageSumm: ISummary = {
        title: "By Age",
        headers: [
            {
                value: <strong>{stateData.cause_of_death}</strong>,
                label: "Cause of Death"
            }
        ]
    }

    const deathsBySex: IBar = {
        title: "Deaths per 100,000 Residents",
        labels: ["Sex"],
        datasets: [
            {
                label: 'Overall',
                backgroundColor: colors.black,
                borderColor: 'rgba(16,44,76,0.8)',
                borderWidth: 1,
                data: [stateData["Overall"]]
            },
            {
                label: 'Female',
                backgroundColor: colors.cerise,
                borderColor: colors.cerise,
                borderWidth: 1,
                data: [stateData["Sex Female"]]
            },
            {
                label: "Male",
                backgroundColor: colors.mitreBlue,
                borderColor: colors.mitreBlue,
                borderWidth: 1,
                data: [stateData["Sex Male"]]
            }
        ]
    }

    // color gradient by transparency
    var grad: Array<string> = gradient('rgba(0,91,148)', 9)

    const deathsByAge: IBar = {
        title: "Deaths per 100,000 Residents",
        labels: ["Age Range"],
        datasets: [
            {
                label: 'Overall',
                backgroundColor: colors.black,
                borderColor: colors.black,
                borderWidth: 1,
                data: [stateData["Overall"]]
            },
            {
                label: '1-4',
                backgroundColor: grad[0],
                borderColor: grad[8],
                borderWidth: 1,
                data: [stateData["Age 1 4"]]
            },
            {
                label: "15-24",
                backgroundColor: grad[1],
                borderColor: grad[1],
                borderWidth: 1,
                data: [stateData["Age 15 24"]]
            },
            {
                label: "25-34",
                backgroundColor: grad[2],
                borderColor: grad[2],
                borderWidth: 1,
                data: [stateData["Age 25 34"]]
            },
            {
                label: "35-44",
                backgroundColor: grad[3],
                borderColor: grad[3],
                borderWidth: 1,
                data: [stateData["Age 35 44"]]
            },
            {
                label: "45-54",
                backgroundColor: grad[4],
                borderColor: grad[4],
                borderWidth: 1,
                data: [stateData["Age 45 54"]]
            },
            {
                label: "55-64",
                backgroundColor: grad[5],
                borderColor: grad[5],
                borderWidth: 1,
                data: [stateData["Age 55 64"]]
            },
            {
                label: "65-74",
                backgroundColor: grad[6],
                borderColor: grad[6],
                borderWidth: 1,
                data: [stateData["65 74"]]
            },
            {
                label: "75-84",
                backgroundColor: grad[7],
                borderColor: grad[7],
                borderWidth: 1,
                data: [stateData["Age 75 84"]]
            },
            {
                label: "85+",
                backgroundColor: grad[8],
                borderColor: grad[8],
                borderWidth: 1,
                data: [stateData["Age 85 Plus"]]
            }
        ]
    }

    const dataHandler = (keyWord: any) => {

        var currentDataset = ``;
        if (keyWord === 'All causes') {
            currentDataset = getRecentYearDCModelAllCauses;
        }
        if (keyWord === 'Alzheimer disease') {
            currentDataset = getRecentYearDCModelAlzheimer;
        }
        if (keyWord === "COVID-19") {
            currentDataset = getRecentYearDCModelCovid19;
        }
        if (keyWord === "Cancer") {
            currentDataset = getRecentYearDCModelCancer;
        }
        if (keyWord === "Chronic liver disease and cirrhosis") {
            currentDataset = getRecentYearDCModelLiver;
        }
        if (keyWord === "Chronic lower respiratory diseases") {
            currentDataset = getRecentYearDCModelRespiratory;
        }
        if (keyWord === "Diabetes") {
            currentDataset = getRecentYearDCModelDiabetes;
        }
        if (keyWord === "Heart disease") {
            currentDataset = getRecentYearDCModelHeart;
        }
        if (keyWord === "HIV disease") {
            currentDataset = getRecentYearDCModelHIV;
        }
        if (keyWord === "Hypertension") {
            currentDataset = getRecentYearDCModelHypertension;
        }
        if (keyWord === "Influenza and pneumonia") {
            currentDataset = getRecentYearDCModelFluPneu;
        }
        if (keyWord === "Kidney disease") {
            currentDataset = getRecentYearDCModelKidney;
        }
        if (keyWord === "Parkinson disease") {
            currentDataset = getRecentYearDCModelParkinsons;
        }
        if (keyWord === "Pneumonitis due to solids and liquids") {
            currentDataset = getRecentYearDCModelPneumonionitis;
        }
        if (keyWord === "Septicemia") {
            currentDataset = getRecentYearDCModelSepticimia;
        }
        if (keyWord === "Stroke") {
            currentDataset = getRecentYearDCModelStroke;
        }

        //fetch data with the keyword as the endpoint in the call
        fetch(currentDataset)
            .then(response => response.json())
            .then(data => {
                setStateData(renameStateKeys(data))
            });
    }

    React.useEffect(() => {

        //first fetch the data for all diseases on render
        fetch(getRecentYearDCModelAllCauses)
            .then(response => response.json())
            .then(data => {
                setStateData(renameStateKeys(data))
            });

        //data to display map
        fetch('http://unpkg.com/us-atlas/states-10m.json')
            .then((response) => response.json())
            .then((value) => {
                setGeoData(
                    ChartGeo.topojson.feature(
                        value,
                        value.objects["states"]
                        //@ts-ignore
                    ).features
                );
            });
    }, []);



    const [get3YearDCdata, save3YearDCdata] = React.useState({
        title: "",
        labels: ['Q1', "Q2"],
        datasets: [{
            label: 'February 2023',
            backgroundColor: 'rgba(16,44,76,0.5)',
            borderColor: 'rgba(16,44,76,0.8)',
            borderWidth: 0,
            data: [3051, 45406, 7066, 8936] //data here so no errors, but overwrites this
        },]
    });

    //cause of death per quarters, past 4 years
    React.useEffect(() => {
        fetch(getRecent3YearDCModel)
            .then(response => response.json())
            .then(data => {

                var index = data[0].datasets.findIndex((obj: { label: any; }) => obj.label === stateData.cause_of_death);
                var objToDisplay = {
                    title: "Quarterly data of US Causes of Death for " + stateData.cause_of_death + " (rate per 100,000 people)",
                    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                    datasets: [
                        {
                            label: data[0].datasets[index].data[0].year,
                            backgroundColor: colors.black,
                            borderColor: colors.black,
                            borderWidth: 0,
                            data: data[0].datasets[index].data[0].data
                        },
                        {
                            label: data[0].datasets[index].data[1].year,
                            backgroundColor: colors.mitreBlue,
                            borderColor: colors.mitreBlue,
                            borderWidth: 0,
                            data: data[0].datasets[index].data[1].data
                        },
                        {
                            label: data[0].datasets[index].data[2].year,
                            backgroundColor: colors.white,
                            borderColor: colors.mitreDarkBlue,
                            borderWidth: 1,
                            data: data[0].datasets[index].data[2].data
                        },
                        {
                            label: data[0].datasets[index].data[3].year,
                            backgroundColor: colors.mitreYellow,
                            borderColor: colors.mitreDarkBlue,
                            borderWidth: 1,
                            data: data[0].datasets[index].data[3].data
                        }
                    ]
                }
                save3YearDCdata(objToDisplay);
            })
    }, [stateData]);


    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">MITRE | HSD</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="regions">Regions</Nav.Link>
                        <Nav.Link href="#risks">Risks</Nav.Link>
                        <Nav.Link href="#systems">Health Systems</Nav.Link>
                    </Nav>
                    <Nav className="ml-auto">
                        <Button variant="light" style={{ marginLeft: "auto" }}>Reset</Button>
                    </Nav>
                </Container>
            </Navbar>
            <br />
            <h2 className="title" >Regional Health Status</h2>
            <br />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-1">
                    </div>
                    <div className="col-10">
                        <div className="region-container">
                            <SummaryCard data={regionSumm} />
                            <DropdownButton id="dropdown-basic-button" title="Causes of Death" variant="transparent">
                                <Dropdown.Item onClick={() => dataHandler("All causes")}>All Causes</Dropdown.Item>
                                <Dropdown.Item onClick={() => dataHandler("Alzheimer disease")}>Alzheimer's Disease</Dropdown.Item>
                                <Dropdown.Item onClick={() => dataHandler("COVID-19")}>COVID-19</Dropdown.Item>
                                <Dropdown.Item onClick={() => dataHandler("Cancer")}>Cancer</Dropdown.Item>
                                <Dropdown.Item onClick={() => dataHandler("Chronic liver disease and cirrhosis")}>Chronic Liver Disease and Cirrhosis</Dropdown.Item>
                                <Dropdown.Item onClick={() => dataHandler("Chronic lower respiratory diseases")}>Chronic Lower Respiratory Diseases</Dropdown.Item>
                                <Dropdown.Item onClick={() => dataHandler("Diabetes")}>Diabetes</Dropdown.Item>
                                <Dropdown.Item onClick={() => dataHandler("Heart disease")}>Heart Disease</Dropdown.Item>
                                <Dropdown.Item onClick={() => dataHandler("HIV disease")}>HIV Disease</Dropdown.Item>
                                <Dropdown.Item onClick={() => dataHandler("Hypertension")}>Hypertension</Dropdown.Item>
                                <Dropdown.Item onClick={() => dataHandler("Influenza and pneumonia")}>Influenza and Pneumonia</Dropdown.Item>
                                <Dropdown.Item onClick={() => dataHandler("Kidney disease")}>Kidney Disease</Dropdown.Item>
                                <Dropdown.Item onClick={() => dataHandler("Parkinson disease")}>Parkinson Disease</Dropdown.Item>
                                <Dropdown.Item onClick={() => dataHandler("Pneumonitis due to solids and liquids")}>Pneumonitis due to solids and liquids</Dropdown.Item>
                                <Dropdown.Item onClick={() => dataHandler("Septicemia")}>Septicemia</Dropdown.Item>
                                <Dropdown.Item onClick={() => dataHandler("Stroke")}>Stroke</Dropdown.Item>
                            </DropdownButton>
                            <div className="blue" style={{ position: "relative", height: "75vh", width: "89%", margin: "0 auto" /*, padding: "10px"*/ }}>
                                <div style={{ position: "relative", height: "60vh", width: "89%", margin: "0 auto", top: "10%" }}>
                                    <Chart
                                        className='blue'
                                        ref={chartRef}
                                        type="choropleth"
                                        data={{
                                            labels: geoData.map(
                                                (d: any) => d.properties["name"]
                                            ),
                                            datasets: [
                                                {
                                                    outline: geoData,
                                                    label: "Countries",
                                                    data: geoData.map((d: any) => ({
                                                        feature: d,
                                                        value: Number(stateData[d.properties.name])
                                                    })),
                                                }
                                            ]
                                        }}
                                        options={{
                                            showOutline: true,
                                            showGraticule: true,
                                            plugins: {
                                                legend: {
                                                    display: false
                                                }
                                            },
                                            maintainAspectRatio: false,
                                            responsive: true,
                                            scales: {
                                                // xy: {
                                                //     projection: "equalEarth"
                                                // }
                                                // Hide color scale
                                                // color: {
                                                //   display: false
                                                // }
                                            }
                                        }}
                                    />

                                    <br />
                                    <p className='source_small_font'>National Center for Health Statistics. NCHS - VSRR Quarterly provisional estimates for selected indicators of mortality. Available from https://data.cdc.gov/d/489q-934x</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-1">
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-1">
                    </div>
                    <div className="col-5">
                        <div className="region-container" >
                            <SummaryCard data={sexSumm} />
                            <MiniBarCard data={deathsBySex} />
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="region-container" >
                            <SummaryCard data={ageSumm} />
                            <MiniBarCard data={deathsByAge} />
                        </div>
                    </div>
                    <div className="col-1">
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-1">
                    </div>

                    <div className="col-10">
                        <div className="region-container">

                            <BarCard data={get3YearDCdata} />
                            <br />
                            <p className='source_small_font'>National Center for Health Statistics. NCHS - VSRR Quarterly provisional estimates for selected indicators of mortality. Available from https://data.cdc.gov/d/489q-934x.</p>

                        </div>
                        <div className="col-1">
                        </div>
                    </div>
                </div>
            </div>
            <div className="foot">
            </div>
        </>
    );

}
