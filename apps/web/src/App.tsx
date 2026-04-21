import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase';
import { generateBoard } from '@sudoku/core/game/generator';
import { Home } from './pages/Home/Home';
import { NotFound } from "./pages/NotFound/NotFound";
import useSudokuStore from "./store/store";

function App() {

  useEffect(() => {
    generateBoard();
  }, []) 

  const setCurrentUser = useSudokuStore((state) => state.setCurrentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe(); // cleanup on unmount
  }, []);
  
  return (
    <BrowserRouter basename="/SudokuFlow">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
