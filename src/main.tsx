import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TempPage from './pages/TempPage'
import Home from './pages/Home'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/temp" element={<TempPage />} />
        {/* <Route path="/temp" element={ <TempPage/> } /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
