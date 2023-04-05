

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

import { initLocalJurisdictions, getLocalJurisdictions, initJurisdictions, getJurisdictions } from '../endpoints/lifeExpectancyURLs'
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

let sData = {
    "year_and_quarter": "2022 Q3", "time_period": "12 months ending with quarter", "cause_of_death": "All causes",
    "rate_type": "Age-adjusted", "unit": "Deaths per 100,000", "rate_overall": "833.7", "rate_sex_female": "700.2", "rate_sex_male": "986",
    "rate_alaska": "888.4", "rate_alabama": "1014.5", "rate_arkansas": "1027", "rate_arizona": "845.8", "rate_california": "710.1",
    "rate_colorado": "789.1", "rate_connecticut": "716.9", "rate_district_of_columbia": "815.7", "rate_delaware": "848.3",
    "rate_florida": "747.1", "rate_georgia": "895.7", "rate_hawaii": "633.9", "rate_iowa": "852.6", "rate_idaho": "840.6",
    "rate_illinois": "814", "rate_indiana": "977.2", "rate_kansas": "906.5", "rate_kentucky": "1083.7", "rate_louisiana": "983.3",
    "rate_massachusetts": "718.9", "rate_maryland": "776.8", "rate_maine": "902.6", "rate_michigan": "920", "rate_minnesota": "760.9",
    "rate_missouri": "932.6", "rate_mississippi": "1093.2", "rate_montana": "871.9", "rate_north_carolina": "893.1",
    "rate_north_dakota": "800.8", "rate_nebraska": "814.5", "rate_new_hampshire": "791.6", "rate_new_jersey": "702.8",
    "rate_new_mexico": "959", "rate_nevada": "886.6", "rate_new_york": "682.9", "rate_ohio": "983", "rate_oklahoma": "1058.2",
    "rate_oregon": "840.2", "rate_pennsylvania": "869", "rate_rhode_island": "754.4", "rate_south_carolina": "953.4",
    "rate_south_dakota": "849.7", "rate_tennessee": "1044.7", "rate_texas": "848.2", "rate_utah": "796.6",
    "rate_virginia": "835.6", "rate_vermont": "787.8", "rate_washington": "787.8", "rate_wisconsin": "843.5",
    "rate_west_virginia": "1177.9", "rate_wyoming": "910.3"
}
//https://data.cdc.gov/resource/489q-934x.json?year_and_quarter=2022%20Q3



function renameStateKeys(data: any) {
    //const arr = JSON.parse(data);
    for (var k in data) {
        if (data.hasOwnProperty(k)) {
            if (k.substring(0, 4) === "rate") {
                var newK = k.slice(5)
                data[newK.toLowerCase()] = data[k]
                delete data[k]
            }
        }
    }
    return data
}

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
        const response = await fetch(initJurisdictions);
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

        setStateData(renameStateKeys(sData))


        fetch('http://unpkg.com/us-atlas/states-10m.json')
            .then((response) => response.json())
            .then((value) => {
                setGeoData(underscoreStates(
                    ChartGeo.topojson.feature(
                        value,
                        value.objects["states"]
                        //@ts-ignore
                    ).features)
                );
            });

    }, []);
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


            <div>
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
                                    <Dropdown.Item href="#/action-3">COVID-19</Dropdown.Item>
                                    <Dropdown.Item href="#/action-1">Cancer</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Chronic Liver Disease and Cirrhosis</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Chronic Lower Respiratory Diseases</Dropdown.Item>
                                    <Dropdown.Item href="#/action-1">Diabetes</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Heart Disease</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">HIV Disease</Dropdown.Item>
                                    <Dropdown.Item href="#/action-1">Homicide</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Hypertensiona</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Influenza and Pneumonia</Dropdown.Item>
                                    <Dropdown.Item href="#/action-1">Kidney Disease</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Parkinson Disease</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Pneumonitis due to solids and liquids</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Septicemia</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Stroke</Dropdown.Item>
                                </DropdownButton>
                            </div>
                        </div>
                        <div className="col-1">
                        </div>
                    </div>

                    <div className="row">
                        <div style={{ margin: "0 auto" }}>
                            <div className="blue" style={{ position: "relative", height: "70vh", width: "83%", margin: "0 auto" /*, padding: "10px"*/ }}>
                                <div style={{ position: "relative", height: "60vh", width: "83%", margin: "0 auto", top: "10%" }}>
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
                                            maintainAspectRatio: true,
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="foot">
            </div>
        </>
    );

}