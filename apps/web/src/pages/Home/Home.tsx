import { useState, useEffect, useCallback, act } from "react";
import useSudokuStore from "../../store/store";
import { useLoadGame } from '../../hooks/useLoadGame';
import { useInitGame } from '../../hooks/useInitGame';
import { useBoardActions } from '../../hooks/useBoardActions';
import { AuthModal } from "../../components/AuthModal/AuthModal";
import { Header } from '../../components/Header/Header';
import { Menu } from '../../components/Menu/Menu';
import { Board } from "../../components/ui/Board/Board";
import { Loader } from '../../components/ui/Loader/Loader';

export const Home = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const currentUser = useSudokuStore(state => state.currentUser);
  const currentBoard = useSudokuStore(state => state.currentBoard);
  const activeBoardId = useSudokuStore(state => state.activeBoardId);

  const handleAuthModalOpen = useCallback(() => setIsAuthModalOpen(true), []);
  const handleAuthModalClose = useCallback(() => setIsAuthModalOpen(false), []);

  const { initGame, isLoading, error } = useInitGame()

  const { handleChangeValue, handleCellClick } = useBoardActions();
  const { loadGame, checkActiveBoard } = useLoadGame();


  useEffect(() => {
    if (currentUser) {
      checkActiveBoard();
    }
  }, [currentUser]);


  if (isLoading) return <Loader />
  if (error) return <p>Failed to load game. Please refresh.</p>

  const onNewGame = () => {
    console.log(currentUser);
    if (!currentUser) {
      handleAuthModalOpen()
      return
    }
    initGame()
  }

  const onLoadGame = () => {
    if (!currentUser) {
      handleAuthModalOpen()
      return
    }
    if (activeBoardId) {
      loadGame();
    }

    return;
  }


  return (
    <>
      <Header name={currentUser?.displayName} handleOpenModal={handleAuthModalOpen} />

      {!currentBoard && (
        <Menu
          onNewGame={onNewGame}
          onContinue={onLoadGame}
        />
      )}
      <Board board={currentBoard} handleChangeValue={handleChangeValue} handleCellClick={handleCellClick} />
      <AuthModal isOpen={isAuthModalOpen} onClose={handleAuthModalClose} />
    </>
  );
};