import type { BoardType } from '@sudoku/core/types'
import { BoardCell } from '@sudoku/ui/web/BoardCell/BoardCell';

import css from './Board.module.scss';

interface SudokuBoardProps {
  handleCellClick: (row: number, col: number) => void;
  handleChangeValue: (row: number, col: number, value: number) => void;
  board: BoardType | null;
}

export const Board = ({ board, handleChangeValue, handleCellClick }: SudokuBoardProps) => {

  if (!board) return null;

    return (
      <div className={css.board}>
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <BoardCell
              key={`${rowIndex}-${colIndex}`}
              row={rowIndex}
              col={colIndex}
              value={cell.value}
              isReadOnly={cell.isReadOnly}
              isWrong={cell.isWrong}
              isFocused={cell.isFocused}
              isHighlighted={cell.isHighlighted}
              onChangeValue={handleChangeValue}
              onClick={handleCellClick}
            />
          ))
        )}
      </div>
    );
  };