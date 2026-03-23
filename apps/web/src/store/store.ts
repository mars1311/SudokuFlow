import { create } from 'zustand'
import type { User, Board } from '@sudoku/core/types'


interface SudokuStore {
  currentUser: User | null,
  currentBoard: Board | null,
  setUser: (user: User) => void,
  setBoard: (board: Board) => void,

}
const useSudoku = create<SudokuStore>((set) => ({
    currentUser: null,
    currentBoard: null,
    setUser: (user: User) => set({currentUser: user}),
    setBoard: (board: Board) => set({currentBoard: board})
  }
))

export default useSudoku;