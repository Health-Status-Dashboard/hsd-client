import * as React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
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
import { HorizontalBarCard } from '../cards/HorizontalBarCard';
import { ISummary } from '../interfaces/ISummary';
import { colors, gradient } from '../colors/colors'
import { getGDPHealthCostsCountry, getNumDoctors, getNumGrads, getNumMedProf, getPharmaSpending } from '../endpoints/healthsystemsURLs';

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


export default function HealthSystems() {

    const firstSumm: ISummary = {
        title: "Overview of US + World Health",
        headers: []
    }
    const GDPSumm: ISummary = {
        title: "Healthcare Spending (% GDP)",
        headers: [
            {
                value: "US + other countries",
                label: "2021 (or most recent data)"
            }
        ]
    }

    const [percentGDPHealthCostsCountry, savePercentGDPHealthCostsCountry] = React.useState({
        title: '',
        labels: [],
        datasets: []
    });
    React.useEffect(() => {
        fetch(getGDPHealthCostsCountry)
            .then(response => response.json())
            .then(data => {

                for (var i = 0; i < data[0].datasets.length; i++) {
                    data[0].datasets[i].backgroundColor = colors.darkOrange
                }

                savePercentGDPHealthCostsCountry(data[0]);
            })
    }, []);

    const [percentSpendingPharmaUS, savePercentSpendingPharmaUS] = React.useState({
        title: '',
        headers: []
    });
    React.useEffect(() => {
        fetch(getPharmaSpending)
            .then(response => response.json())
            .then(data => {
                savePercentSpendingPharmaUS(data[0]);
            })
    }, []);

    const [numberDoctorsUS, saveNumberDoctorsUS] = React.useState({
        title: '',
        headers: []
    });
    React.useEffect(() => {
        fetch(getNumDoctors)
            .then(response => response.json())
            .then(data => {
                saveNumberDoctorsUS(data[0]);
            })
    }, []);
    const [numberMedicalGradsUS, saveNumberMedicalGradsUS] = React.useState({
        title: '',
        headers: []
    });
    React.useEffect(() => {
        fetch(getNumGrads)
            .then(response => response.json())
            .then(data => {
                saveNumberMedicalGradsUS(data[0]);
            })
    }, []);


    const [numberMedicalProfUS, saveNumberMedicalProfUS] = React.useState({
        title: '',
        labels: [],
        datasets: []
    });
    React.useEffect(() => {
        fetch(getNumMedProf)
            .then(response => response.json())
            .then(data => {
                saveNumberMedicalProfUS(data[0]);
            })
    }, []);


    return (<>
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">MITRE | HSD</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/regions">Regions</Nav.Link>
                    <Nav.Link href="#risks">Risks</Nav.Link>
                    <Nav.Link href="/systems">Health Systems</Nav.Link>

                </Nav>
            </Container>
        </Navbar>
        <br />
        <h2 className="title" >The US Health System</h2>
        <br />
        <div className="container-fluid">

            <div className="row">
                <div className="col-12">
                    <div className="region-container">
                        <SummaryCard data={firstSumm} />

                        <div className='col-6'>
                            <SummaryCard data={GDPSumm} />
                            <BarCard data={percentGDPHealthCostsCountry} />
                        </div>


                        <div className='col-6'>
                            <SummaryCard data={percentSpendingPharmaUS} />
                            <SummaryCard data={numberDoctorsUS} />
                            <SummaryCard data={numberMedicalGradsUS} />
                            

                        </div>
                        <HorizontalBarCard data={numberMedicalProfUS} />



                    </div>



                </div>
            </div>
        </div>
    </>);
}