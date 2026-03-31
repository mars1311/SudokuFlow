import { useState, useEffect } from 'react';
import css from './AuthModal.module.scss';
import { OAuthButtons } from './OAuthButtons';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';
import { Modal } from '../ui/Modal/Modal';
import { Loader } from '../ui/Loader/Loader';
interface AuthModalInterface {
  isOpen: boolean,
  onClose: () => void,
}
export const AuthModal = ({ isOpen, onClose }: AuthModalInterface) => {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscapeKey)
    return () => document.removeEventListener('keydown', handleEscapeKey)
  }, [])

  const [mode, setMode] = useState<'signin' | 'signup'>('signup');
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1 className={css.authModal__title}>Don&apos;t lose your progress!</h1>
          <OAuthButtons mode={mode} onClose={onClose} />
          {mode === 'signin'
            ? <SignInForm onClose={onClose} />
            : <SignUpForm onClose={onClose} />
          }
          <footer className={css.authModal__footer}>
            {mode === 'signin'
              ? <p>Don't have an account? <button className={css.authModal__footerBtn} onClick={() => setMode('signup')}>Sign up</button></p> // temporary classname
              : <p>Already have an account? <button className={css.authModal__footerBtn} onClick={() => setMode('signin')}>Sign in</button></p> // temporary classname
            }
          </footer>
        </>
      )
      }
    </Modal>
  );
}