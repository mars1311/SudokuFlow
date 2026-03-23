import { AuthButton } from '../AuthButton/AuthButton';
import css from './AuthModal.module.scss';
import GoogleIcon from '../../assets/google.svg?react';
import AppleIcon from '../../assets/apple.svg?react'

export const OAuthButtons = () => {
  return (
   <div className={css.authModal__buttons}>
      <AuthButton text="Google" logo={GoogleIcon} />
      <AuthButton text="Apple" logo={AppleIcon} />
    </div>
  )
};