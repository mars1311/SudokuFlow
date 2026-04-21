import { signOut } from 'firebase/auth';
import { auth } from '../../services/authService';
import { useState } from 'react';
import css from './Header.module.scss';
import useSudokuStore from '../../store/store';
interface Header {
  name: string | null | undefined;
  handleOpenModal: () => void;

}

export const Header = ({name, handleOpenModal}: Header) => {
  const currentUser = useSudokuStore(state => state.currentUser);
  const reset = useSudokuStore(state => state.reset);

  const handleLogOut = async () => {
    await signOut(auth);
    reset();
  }

  return (
    <header className={css.header}>
      <div className={css.header__container}>
        <div className={css.header__logo}>
          <span className={css['header__logo-text']}>Play</span>
          <span className={`${css['header__logo-text']} ${css['header__logo-text--accent']}`}>Sudoku</span>
        </div>

        <nav className={css.header__nav}>
          <ul className={css.header__list}>
            <li className={css.header__item}>
              <a href="/" className={`${css.header__link} ${css['header__link--active']}`}>Play</a>
            </li>
            <li className={css.header__item}>
              <a href="/archive" className={css.header__link}>Archive</a>
            </li>
            <li className={css.header__item}>
              <a href="/stats" className={css.header__link}>Stats</a>
            </li>
          </ul>
        </nav>

        <div className={css.header__actions}>
          {currentUser ? (
            <div className={css.header__user}>
              <span className={css.header__username}>{name}</span>
              <button
                className={`${css.header__button} ${css['header__button--logout']}`}
                onClick={handleLogOut}
              >
                Log Out
              </button>
            </div>
          ) : (
            <button
              className={`${css.header__button} ${css['header__button--login']}`}
              onClick={handleOpenModal}
            >
              Log In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;