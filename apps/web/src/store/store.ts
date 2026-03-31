import type { User as FirebaseUser } from 'firebase/auth'
import { create } from 'zustand'
import type { User, Board } from '@sudoku/core/types'


interface SudokuStore {
  currentUser: FirebaseUser | null,
  userProfile: User | null,
  currentBoard: Board | null,
  setCurrentUser: (user: FirebaseUser) => void,
  setUserProfile: (user: User | null) => void,
  setBoard: (board: Board) => void,

}
const useSudokuStore = create<SudokuStore>((set) => ({
  currentUser: null,
  userProfile: null,
  currentBoard: null,
  setCurrentUser: (user) => set({ currentUser: user }),
  setUserProfile: (user) => set({ userProfile: user }),
  setBoard: (board) => set({ currentBoard: board }),
}))

export default useSudokuStore;