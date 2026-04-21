import { useState } from "react";
import { generateBoard, parseBoard } from '@sudoku/core/game/generator';
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../services/firebase';
import { generateBoardId } from '@sudoku/core/utils/generateBoardId';
import useSudokuStore from '../store/store';

export const useInitGame = () => {
  const { currentUser, setBoard, setSolution, setActiveBoardId } = useSudokuStore();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const initGame = async () => {
    try {
      if (!currentUser) throw new Error('No user logged in');
      setIsLoading(true)
      const raw = await generateBoard()

      if (!raw) throw new Error('Board generation failed');

      const boardId = generateBoardId();
      const parsedBoard = parseBoard(raw.value);

      await setDoc(doc(db, 'boards', boardId), {
        boardId,
        userId: currentUser.uid,
        puzzle: JSON.stringify(raw.value),
        solution: JSON.stringify(raw.solution),
        currentState: JSON.stringify(parsedBoard),
        createdAt: serverTimestamp(),
        completedAt: null,
        status: 'active',
      });

      await setDoc(
        doc(db, 'users', currentUser.uid),
        { activeBoardId: boardId },
        { merge: true }
      );

      setBoard(parsedBoard);
      setSolution(raw.solution);
      setActiveBoardId(boardId);

    }
    catch (err) {
      console.error(err);
      setError('Failed to load game');
    }
    finally {
      setIsLoading(false)
    }
  }

  return { initGame, isLoading, error }
}