// hooks/useBoardActions.ts
import { useCallback } from 'react';
import useSudokuStore from '../store/store';

export const useBoardActions = () => {
  const board = useSudokuStore(state => state.currentBoard);
  const solutionBoard = useSudokuStore(state => state.solutionBoard);
  const updateCell = useSudokuStore(state => state.updateCell);
  const setBoard = useSudokuStore(state => state.setBoard);

  const handleChangeValue = useCallback((row: number, col: number, value: number) => {
    if (!board || !solutionBoard) return;
    const isWrong = value !== 0 && value !== solutionBoard[row][col];
    updateCell(row, col, value, isWrong);
  }, [board, solutionBoard, updateCell]);

  const handleCellClick = useCallback((row: number, col: number) => {
    if (!board) return;
    const newBoard = board.map((r, rI) =>
      r.map((cell, cI) => ({ ...cell, isFocused: rI === row && cI === col }))
    );
    setBoard(newBoard);
  }, [board, setBoard]);

  return { handleChangeValue, handleCellClick };
};