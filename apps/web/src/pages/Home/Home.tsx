import { useState, useCallback, useEffect } from "react";
import { AuthModal } from "../../components/AuthModal/AuthModal";
import useSudokuStore from "../../store/store";
import { Board } from "../../components/ui/Board/Board";

export const Home = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(true);
  const currentUser = useSudokuStore(state => state.currentUser)
  const handleAuthModalOpen = useCallback(() => setIsAuthModalOpen(true), []);
  const handleAuthModalClose = useCallback(() => setIsAuthModalOpen(false), []);

  return (
    <>
      <AuthModal isOpen={isAuthModalOpen} onClose={handleAuthModalClose} />
      <h2>Here will be sudoku {currentUser?.displayName } </h2>
      <Board />
      {!isAuthModalOpen && (
        <button onClick={handleAuthModalOpen}>Open Auth Modal</button>
      )}
    </>
  );
};