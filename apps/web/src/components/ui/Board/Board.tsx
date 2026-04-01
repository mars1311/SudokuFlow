
import css from './Board.module.scss';

type Props = {
  size?: number; // default 9
};

export const Board = ({ size = 9 }: Props) => {
  const cells = Array.from({ length: size * size });

  return (
    <div className={css.sudoku}>
      {cells.map((_, i) => (
        <input
          key={i}
          className={css.sudoku__cell}
          maxLength={1}
        />
      ))}
    </div>
  );
};