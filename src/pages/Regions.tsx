

import * as React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

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

// this is all placeholder data


const alcoholData: IStats = {
    title: "Alcohol & Tobacco",
    stats: [
        {
            value: <strong>15.4%</strong>,
            label: "adults report recent heavy drinking in 2021"
        },
        {
            value: <strong>6.3%</strong>,
            label: "adults report recent binge drinking in 2021"
        },
        {
            value: <strong>14.4%</strong>,
            label: "adults report smoking in 2021"
        },
        {
            value: <strong>3.5%</strong>,
            label: "adults report using smokeless tobacco in 2021"
        },
        {
            value: <strong>50.8%</strong>,
            label: "adult smokers report attempts to quit tobacco in 2021"
        }

    ]
    // alcohol: https://chronicdata.cdc.gov/resource/5hba-acwf.json?locationabbr=US&stratification1=Overall&$where=yearstart%20%3E%202020&topic=Alcohol
    // tobacco: https://chronicdata.cdc.gov/resource/g4ie-h725.json?locationabbr=US&yearend=2021&stratification1=Overall&topic=Tobacco
}





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


    //const [lifeExpectancy, saveLifeExpectancy] = React.useState(lineData);
    React.useEffect(() => {
        /*
        fetch(getJurisdictions)
            .then(response => response.json())
            .then(data => {
                saveLifeExpectancy(data[0]);
            })
            */
    }, []);

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">MITRE | HSD</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Regions</Nav.Link>
                        <Nav.Link href="#risks">Risks</Nav.Link>
                        <Nav.Link href="#systems">Health Systems</Nav.Link>

                    </Nav>
                    <Nav className="ml-auto">
                        <Button onClick={initData} variant="light" style={{ marginLeft: "auto" }}>Reset</Button>
                    </Nav>
                </Container>
            </Navbar>
            <br />
            <h2 className="title" >Health Status Dashboard</h2>
            <br />
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3">
                            <div className="region-container">
                                <StatsCard data={alcoholData} />
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