import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TempPage from './pages/TempPage'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <App/> } />
        <Route path="/temp" element={ <TempPage/> } />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
