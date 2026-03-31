import { AuthButton } from '../AuthButton/AuthButton';
import css from './AuthModal.module.scss';
import GoogleIcon from '../../assets/google.svg?react';
import { useGoogleAuthSignIn } from '../../hooks/useGoogleAuth';
interface OAuthButtons {
  mode: 'signup' | 'signin',
  onClose: () => void,
}

export const OAuthButtons = ({ mode, onClose }: OAuthButtons) => {
  const { googleAuthSignIn } = useGoogleAuthSignIn();
  
  const onSubmit = async () => {
    const user = await googleAuthSignIn();

    if(user) {
      onClose()
    }
  }

  const text = mode === 'signin' ? 'Sign in with' : 'Signup with';

  return (
   <div className={css.authModal__authBtns}>
      <AuthButton text={text + ' ' + 'Google'} logo={GoogleIcon} onClick={onSubmit} />
    </div>
  )
};