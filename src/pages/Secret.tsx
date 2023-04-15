import * as React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';


import { updateDB } from '../endpoints/serverURLs'

//TODO replace this reset button with API call 
async function initData(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    try {
        var response = await fetch(updateDB);
        const { status } = response;
        return status;
    } catch (err) {
        // handle error
        console.error(err);
    }
}

export default function Secret() {


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