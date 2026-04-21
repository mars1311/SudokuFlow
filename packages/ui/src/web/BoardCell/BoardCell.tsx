import React from 'react';
import { type Cell } from '@sudoku/core/types/types';
import css from './BoardCell.module.scss';

interface BoardCellProps extends Cell {
  row: number;
  col: number;
  onClick: (row: number, col: number) => void;  // remove num
  onChangeValue: (rowIndex: number, colIndex: number, num: number) => void;
}

export const BoardCell = ({
  row,
  col,
  value,
  isReadOnly,
  isWrong,
  isFocused,
  isHighlighted,
  onClick,
  onChangeValue,
}: BoardCellProps) => {
  const cellClasses = [
    css.boardCell,
    isReadOnly && css.boardCell_isReadOnly,
    !isReadOnly && isWrong && css.boardCell_isWrong,
    !isReadOnly && isFocused && css.boardCell_isFocused,
    !isReadOnly && isHighlighted && css.boardCell_isHighlighted,
  ]
    .filter(Boolean)
    .join(' ');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (isReadOnly) return;

    const num = parseInt(e.key);

    if (num >= 1 && num <= 9) {
      onChangeValue(row, col, num);
    }

    if (e.key === 'Backspace' || e.key === 'Delete') {
      onChangeValue(row, col, 0);
    }
  };

  return (
    <div
      className={cellClasses}
      onClick={(e) => {
      e.currentTarget.focus();
      onClick(row, col);
      }}
      onKeyDown={handleKeyDown}
      tabIndex={isReadOnly ? -1 : 0}
      role="gridcell"
      aria-readonly={isReadOnly}
    >
      {value !== 0 ? value : ''}
    </div>
  );
};