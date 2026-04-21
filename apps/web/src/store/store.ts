import type { User as FirebaseUser } from 'firebase/auth'
import { create } from 'zustand'
import type { User, Board} from '@sudoku/core/types/types'


interface SudokuStore {
  currentUser: FirebaseUser | null,
  userProfile: User | null,
  currentBoard: Board | null,
  solutionBoard: number[][] | null,
  activeBoardId: string | null,
  reset: () => void,
  setActiveBoardId: (id: string | null) => void,
  setCurrentUser: (user: FirebaseUser | null) => void,
  setUserProfile: (user: User | null) => void,
  setBoard: (board: Board) => void,
  setSolution: (solution: number[][]) => void,
  updateCell: (rxow: number, col: number, value: number, isWrong: boolean) => void,
}

const useSudokuStore = create<SudokuStore>((set) => ({
  currentUser: null,
  userProfile: null,
  currentBoard: null,
  solutionBoard: null,
  activeBoardId: null,
  reset: () => set({
  currentUser: null,
  userProfile: null,
  currentBoard: null,
  solutionBoard: null,
  activeBoardId: null,
}),
  setCurrentUser: (user) => set({ currentUser: user }),
  setUserProfile: (user) => set({ userProfile: user }),
  setBoard: (board) => set({ currentBoard: board }),
  setSolution: (board) => set({solutionBoard: board }),
  setActiveBoardId: (id) => set({ activeBoardId: id }),
  updateCell: (row, col, value) => set((state) => {
    if (state.currentBoard === null || state.solutionBoard === null) return state;

    const isWrong = value !==0 && value !== state.solutionBoard[row][col];
      const newBoard = state.currentBoard.map((r, rI) =>
      r.map((c, cI) =>
        rI === row && cI === col ? { ...c, value, isWrong } : c
      )
    );
    return { currentBoard: newBoard };
  })
}))

export default useSudokuStore;