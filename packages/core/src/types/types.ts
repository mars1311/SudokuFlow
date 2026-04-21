import { Timestamp } from 'firebase/firestore';

type Difficulty = 'easy' | 'medium' | 'hard';

interface User { 
  id: string;
  username: string;
  email: string;
  savedGameId: string | null;
}

interface SavedGame {
  id: string;
  time: number;
  board: Cell[][];
  level: Difficulty;
}

type BoardType = Cell[][];

interface Cell {
  value: number | null;
  isReadOnly: boolean;
  isWrong: boolean;
  isFocused: boolean;
  isHighlighted: boolean;
}

interface GameState { 
  isFinished: boolean;
  time: number;
  level: Difficulty;
  board: Board;
  errorsCount: number;
  selectedCell: [number, number] | null;
}

type GameStatus = 'active' | 'completed' | 'abandoned';

interface SudokuGame {
  id: string;
  board: Board;
  solution: Board;
  initialBoard: Cell[][];
  notes: boolean[][][];
  difficulty: Difficulty;
  status: GameStatus;
  elapsedSeconds: number;
  mistakes: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type { User, SavedGame, BoardType, GameState, SudokuGame, Cell, Difficulty, GameStatus }
