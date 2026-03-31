interface User { 
  id: string;
  username: string;
  email: string;
  savedGame: SavedGame | null;
}

interface SavedGame {
  id: string;
  time: number;
  board: Board;
  level: Difficulty;
}

type Difficulty = "easy" | "medium" | "hard" | "expert"

type Board = Cell[][];

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

export type { User, SavedGame, Board, GameState, Difficulty, Cell }
