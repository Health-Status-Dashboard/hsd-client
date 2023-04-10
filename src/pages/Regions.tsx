

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
import { StatsCard } from '../cards/StatsCard'
import { LineCard } from '../cards/LineCard'
import { PieCard } from '../cards/PieCard'
import { BarCard } from '../cards/BarCard'
import { SingleLineCard } from '../cards/SingleLineCard'

import { ILongitudinal } from '../interfaces/ILongitudinal';
import { ISummary } from '../interfaces/ISummary';
import { IStats } from '../interfaces/IStats';
import { IProportional } from '../interfaces/IProportional';
import { IBar } from '../interfaces/IBar';
import { ILine } from '../interfaces/ILine';

import { initLifeExpectancy, getLifeExpectancy } from '../endpoints/serverURLs'
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

// this is all placeholder data

import { deathData } from '../regionPlaceholderData'

const regionSumm: ISummary = {
    title: "Death Rate Data by State",
    headers: [
        {
            value: "Deaths per 100,000",
            label: "2022"
        }
    ]
}



function renameStateKeys(data: any) {
    //const arr = JSON.parse(data);
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


// no longer using this
function underscoreStates(data: any) {
    for (const obj of data) {
        obj.properties.name = obj.properties.name.replace(/ /g, "_").toLowerCase()
    }
    return data
}

//TODO make this an async function that makes an api call to the back end 
// back end should do the parsing that happens here
function getDeathData(keyWord: string) {
    const newData = deathData.filter(obj => obj.cause_of_death === keyWord);
    return newData
}



//TODO replace this reset button with API call 
async function initData(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    try {
        const response = await fetch(initLifeExpectancy);
        const { status } = response;
        return status;
    } catch (err) {
        // handle error
        console.error(err);
    }
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
        setStateData(renameStateKeys(getDeathData(keyWord)[0]))
    }

    //const [lifeExpectancy, saveLifeExpectancy] = React.useState(lineData);
    React.useEffect(() => {
        //TODO replace this API call with one to the endpoint in regionPlaceholderData
        //https://data.cdc.gov/resource/489q-934x.json?year_and_quarter=2022%20Q3&rate_type=Age-adjusted&time_period=12%20months%20ending%20with%20quarter

        /*
        fetch(getJurisdictions)
            .then(response => response.json())
            .then(data => {
                saveLifeExpectancy(data[0]);
            })
            */

        setStateData(renameStateKeys(deathData[0]))


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
    console.log(stateData)
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
                        <Button onClick={initData} variant="light" style={{ marginLeft: "auto" }}>Reset</Button>
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

                            <div className="blue" style={{ position: "relative", height: "70vh", width: "89%", margin: "0 auto" /*, padding: "10px"*/ }}>
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

                                    <br/>
                                    <p className='source_small_font'>SOURCE.</p>
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
                            <BarCard data={deathsBySex} />
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="region-container" >
                            <SummaryCard data={ageSumm} />
                            <BarCard data={deathsByAge} />
                        </div>
                    </div>
                    <div className="col-1">
                    </div>
                </div>


            </div>

            <div className="foot">
            </div>
        </>
    );

}