import * as React from 'react'

import { Region } from '../interfaces/Region'
import { SummaryCard } from '../cards/SummaryCard'
import { LineCard } from '../cards/LineCard'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Longitudinal } from '../interfaces/Longitudinal';
import { Summary } from '../interfaces/Summary';

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
const lineData: Longitudinal = {
    title: 'US Life Expectancy (1970 - 2020)',
    label: 'US Life Expectancy',
    x: [1970, 1980, 1990, 2000, 2010, 2020],
    y: [70.8, 73.3, 75.4, 76.8, 78.7, 77.0],
    color: 'rgba(16,44,76)'

}
const summaryData: Summary = {
    title: "United States",
    population: 334533505,
    fertility: 1.754
}



const USDATA = {} as Region;

export default function Home() {
    const [lifeExpectancy, saveLifeExpectancy] = React.useState({});
    React.useEffect(() => {
        const getJurisdictionsUrl = `http://localhost:3001/api/getLifeExpectancy`
        fetch(getJurisdictionsUrl)
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
                </Container>
            </Navbar>
            <br />
            <h2 className="title" >Health Status Dashboard</h2>
            <br />
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col">
                        </div>
                        <div className="col-8">
                            <div className="region-container">
                                <SummaryCard data={summaryData} />
                                <LineCard data={lifeExpectancy} />
                            </div>
                        </div>
                        <div className="col">
                        </div>
                    </div>
                </div>
            </div>
            <div className="foot">
            </div>
        </>
    );

}