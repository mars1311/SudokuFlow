import { useState } from 'react';
import { createPortal } from 'react-dom'
// import LiquidGlass from 'liquid-glass-react'
import css from './AuthModal.module.scss';
import { OAuthButtons } from './OAuthButtons';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';

interface AuthModalInterface {
  isOpen: boolean,
  onClose: () => void,
}
export const AuthModal = ({ isOpen, onClose }: AuthModalInterface) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');

  if (!isOpen) return null;

  return createPortal(
    <div className={css.authModal}>
      <button className={css.authModal__close} onClick={onClose} aria-label="Close">x</button>
      <h1 className={css.authModal__title}>Don&apos;t lose your progress!</h1>
      <OAuthButtons />
      {mode === 'signin' 
        ? <SignInForm />
        : <SignUpForm />
      }
      <footer className={css.authModal__footer}>
        {mode === 'signin' 
          ? <p>Don't have an account? <button className={css.authModal__footerBtn} onClick={() => setMode('signup')}>Sign up</button></p> // temporary classname
          : <p>Already have an account? <button className={css.authModal__footerBtn} onClick={() => setMode('signin')}>Sign in</button></p> // temporary classname
        }
      </footer>
    </div>,
    document.body
  );
}