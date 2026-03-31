import { useState, useCallback } from "react";
import { AuthModal } from "../../components/AuthModal/AuthModal";
import useSudokuStore from "../../store/store";

export const Home = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(true);
  const { currentUser } = useSudokuStore()

  const handleAuthModalOpen = useCallback(() => setIsAuthModalOpen(true), []);
  const handleAuthModalClose = useCallback(() => setIsAuthModalOpen(false), []);

  return (
    <>
      <AuthModal isOpen={isAuthModalOpen} onClose={handleAuthModalClose} />
      <h2>Here will be sudoku {currentUser?.displayName } </h2>
      {!isAuthModalOpen && (
        <button onClick={handleAuthModalOpen}>Open Auth Modal</button>
      )}
    </>
  );
};