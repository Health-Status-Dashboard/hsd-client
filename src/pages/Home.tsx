import * as React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Region } from '../interfaces/Region'
import { RegionCard } from '../cards/RegionCard'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// this is a placeholder
const USDATA: Region = {
    _id: "1",
    name: "United States",
    population: "332,000,000",
    code: "123456789",
    lifeExpectancy: {
        years: [1970, 1980, 1990, 2000, 2010, 2020],
        ages: [70.8, 73.3, 75.4, 76.8, 78.7, 77.0]
    }
}




export default function Home() {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">MITRE | HSD</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Regions</Nav.Link>
                        <Nav.Link href="#features">Risks</Nav.Link>
                        <Nav.Link href="#pricing">Health Systems</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <div>
                <RegionCard data={USDATA} />
            </div>
        </>
    );
}