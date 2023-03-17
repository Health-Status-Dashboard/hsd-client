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
    <div>
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a href="#" className="navbar-brand">MITRE | HSD</a>
                <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav">
                        <a href="#" className="nav-item nav-link">Regions</a>
                        <a href="#" className="nav-item nav-link">Risks</a>
                        <a href="#" className="nav-item nav-link">Health Systems</a>
                    </div>
                    <div className="navbar-nav ms-auto">
                        <a href="https://www.mitre.org/" className="nav-item nav-link">MITRE</a>
                    </div>
                </div>
            </div>
        </nav>

        <div>
            <RegionCard data={USDATA} />
        </div>
    </div>

}