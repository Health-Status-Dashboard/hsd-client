import * as React from 'react'
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useEffect, useRef, useState } from "react";

import {
    initLifeExpectancy, getLifeExpectancy, initAlcoholTobaccoData, getAlcoholTobaccoData, initDCData, getDCData,
    initNAWData, getNAWData, initUSPopulationData, getUSPopulationData, initCDSummaryData, getCDSummaryData, initWeightSummary, getWeightSummary,
    initUninsuredSummary, getUninsuredSummary, initUninsuredByEducation, getUninsuredByEducation, initUninsuredByAge, getUninsuredByAge,
    initUninsuredBySubgroup, getUninsuredBySubgroup, initBirthRateData, getBirthRateData, initGestBirthRates, getGestBirthRates, init12MonthBirthRates, get12MonthBirthRates
} from '../endpoints/HomePageServerURLs'

import { initRecentYearDCModel, getRecentYearDCModelAllCauses, getRecentYearDCModelAlzheimer, getRecentYearDCModelCovid19, getRecentYearDCModelCancer, getRecentYearDCModelLiver, getRecentYearDCModelRespiratory, getRecentYearDCModelDiabetes, getRecentYearDCModelHeart, getRecentYearDCModelHIV, getRecentYearDCModelHypertension, getRecentYearDCModelFluPneu, getRecentYearDCModelKidney, getRecentYearDCModelParkinsons, getRecentYearDCModelPneumonionitis, getRecentYearDCModelSepticimia, getRecentYearDCModelStroke, initRecent3YearDCModel, getRecent3YearDCModel } from '../endpoints/RegionsPageServerURLs'


//TODO replace this reset button with API call 
async function initData(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    try {
        var response = await fetch(initRecentYearDCModel);
        response = await fetch(initRecent3YearDCModel);
        response = await fetch(initLifeExpectancy);
        response = await fetch(initAlcoholTobaccoData);
        response = await fetch(initDCData); //TODO resaves
        response = await fetch(initNAWData); //TODO resaves
        response = await fetch(initUSPopulationData); //TODO resaves
        response = await fetch(initCDSummaryData); //TODO resaves
        response = await fetch(initWeightSummary); //TODO resaves
        response = await fetch(initUninsuredSummary); //TODO resaves
        response = await fetch(initUninsuredByEducation); //TODO resaves
        response = await fetch(initUninsuredByAge); //TODO resaves
        response = await fetch(initUninsuredBySubgroup); //TODO resaves
        response = await fetch(initBirthRateData); //TODO resaves
        response = await fetch(initGestBirthRates); //TODO resaves
        response = await fetch(init12MonthBirthRates); //TODO resaves
        const { status } = response;
        return status;
    } catch (err) {
        // handle error
        console.error(err);
    }
}

export default function Regions() {


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
            <h2 className="title" >TOP SECRET</h2>
            <br />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div style={{ textAlign: "center" }}>
                            <Button onClick={initData} variant="warning" style={{ marginLeft: "auto" }}>Re-Initialize the DB</Button>
                            <br />
                            <br />
                            <p style={{ color: "gray" }}>(give it a few seconds)</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="foot">
            </div>
        </>
    );

}