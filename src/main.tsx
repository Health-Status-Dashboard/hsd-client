import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Regions from './pages/Regions'
import HealthSystems from './pages/HealthSystems'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/regions" element={<Regions />} />
        <Route path="/systems" element={<HealthSystems />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
