import React from 'react';
import css from './Menu.module.scss';

interface MenuProps {
  onNewGame: () => void;
  onContinue: () => void;
}
export const Menu = ({ onNewGame, onContinue }: MenuProps) => {

  return (
    <main className={css.menu}>
      <div className={css.menu__container}>
        <h1 className={css.menu__title}>Sudoku</h1>
        
        <nav className={css.menu__nav}>
          <button className={`${css.menu__button} ${css['menu__button--primary']}`} onClick={onNewGame}>
            New Game
          </button>
          
          <button className={`${css.menu__button} ${css['menu__button--secondary']}`} onClick={onContinue}>
            Continue
          </button>
          
          <button className={`${css.menu__button} ${css['menu__button--outline']}`}>
            Settings
          </button>
        </nav>

        <footer className={css.menu__footer}>
          <span className={css.menu__version}>v1.0.2</span>
        </footer>
      </div>
    </main>
  );
};
