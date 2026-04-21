import { doc, getDoc } from "firebase/firestore";
import { db } from '@sudoku/firebase';
import useSudokuStore from '../../../store/store';

export const useLoadGame = () => {
  const { currentUser, setBoard, setSolution, setActiveBoardId } = useSudokuStore();

  const loadGame = async () => {
    if (!currentUser) return;

    const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
    if (!userDoc.exists()) return;

    const { activeBoardId } = userDoc.data();
    if (!activeBoardId) return;

    const boardDoc = await getDoc(doc(db, 'boards', activeBoardId));
    if (!boardDoc.exists()) return;

    const data = boardDoc.data();

    setBoard(JSON.parse(data.currentState));
    setSolution(JSON.parse(data.solution));
    setActiveBoardId(activeBoardId);
  };

  const checkActiveBoard = async () => {
  if (!currentUser) return;

  const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
  if (!userDoc.exists()) return;

  const { activeBoardId } = userDoc.data();
  if (activeBoardId) {
    setActiveBoardId(activeBoardId);
  }
};

  return { loadGame, checkActiveBoard };
};