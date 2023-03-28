

import * as React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import { Region } from '../interfaces/Region'
import { SummaryCard } from '../cards/SummaryCard'
import { StatsCard } from '../cards/StatsCard'
import { LineCard } from '../cards/LineCard'
import { PieCard } from '../cards/PieCard'

import { Longitudinal } from '../interfaces/Longitudinal';
import { Summary } from '../interfaces/Summary';
import { Stats } from '../interfaces/Stats';
import { Proportional } from '../interfaces/Proportional';

import { initLocalJurisdictions, getLocalJurisdictions, initJurisdictions, getJurisdictions } from '../endpoints/lifeExpectancyURLs'

// this is a placeholder
/*
const USDATA: Region = {
    _id: "1",
    name: "United States",
    population: "334,533,505",
    code: "123456789",
    lifeExpectancy: {
        years: [1970, 1980, 1990, 2000, 2010, 2020],
        ages: [70.8, 73.3, 75.4, 76.8, 78.7, 77.0]
    }
}
*/


const obesitySummary: Summary = {
    title: "Weight Management",
    headers: [
        {
            value: "1.6",
            label: "Adult Median Daily Frequency of Vegetable Consumption"
        },
        {
            value: "23.7%",
            label: "No Reported Leisure-time Physical Activity among Adults"
        }
    ]
}
const pieData: Proportional = {
    title: 'Weight Breakdown',
    labels: ['Obese', 'Overweight', 'Healthy', 'Other/Underweight'],
    datasets: [{
        label: 'Percentage of Population',
        data: [33.9, 34.5, 29.9, 1.7],
        backgroundColor: ['rgba(16,44,76,1)',
            'rgba(16,44,76,0.8)',
            'rgba(16,44,76,0.5)',
            'rgba(16,44,76,0.2)',
            'rgba(16,44,76,0)'],
        borderColor: ['rgba(16,44,76)',
            'rgba(16,44,76)',
            'rgba(16,44,76)',
            'rgba(16,44,76)',
            'rgba(16,44,76)'],
        borderWidth: 1
    }]
}
// weight data
// https://chronicdata.cdc.gov/resource/g4ie-h725.json?locationabbr=US&yearend=2021&stratification1=Overall&topic=Nutrition, Physical Activity, and Weight Status


const summaryData: Summary = {
    title: "United States Overview",
    headers: [
        {
            value: "334,533,505",
            label: "Population"
        },
        {
            value: <span className='red'>1.754</span>,
            label: "Fertility Rate"
        }
    ]
}

const lineData: Longitudinal = {
    title: 'US Life Expectancy (1970 - 2020)',
    label: 'US Life Expectancy',
    x: [1970, 1980, 1990, 2000, 2010, 2020],
    y: [70.8, 73.3, 75.4, 76.8, 78.7, 77.0],
    color: 'rgba(16,44,76)'
}



const alcoholData: Stats = {
    title: "Alcohol & Tobacco",
    stats: [
        {
            value: <strong>15.4%</strong>,
            label: "adults report heavy drinking in 2021"
        },
        {
            value: <strong>6.3%</strong>,
            label: "adults report binge drinking in 2021"
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

const USDATA = {} as Region;

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



export default function Home() {


    const [lifeExpectancy, saveLifeExpectancy] = React.useState(lineData);
    React.useEffect(() => {

        fetch(getJurisdictions)
            .then(response => response.json())
            .then(data => {
                saveLifeExpectancy(data[0]);
            })
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


                        <div className="col-6">
                            <div className="region-container">
                                <SummaryCard data={summaryData} />
                                <LineCard data={lifeExpectancy} />
                            </div>
                        </div>


                        <div className="col-3">
                            <div className="region-container">
                                <SummaryCard data={obesitySummary} />
                                <br />
                                <PieCard data={pieData} />
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