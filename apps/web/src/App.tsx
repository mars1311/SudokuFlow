import { BrowserRouter, Routes, Route } from "react-router-dom"

import { useState, useEffect } from 'react'
import './App.css'
import { generateBoard } from '@sudoku/core/generator';
import { Home } from './pages/Home/Home';
import { NotFound } from "./pages/NotFound/NotFound";
function App() {

  const isUserLoggedIn = false;
  useEffect(() => {
    generateBoard();
  }, []) 
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
