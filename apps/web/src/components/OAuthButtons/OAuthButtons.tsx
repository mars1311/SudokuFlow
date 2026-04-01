import { AuthButton } from '../AuthButton/AuthButton';
import GoogleIcon from '../../assets/google.svg?react';
import { useGoogleAuthSignIn } from '../../hooks/useGoogleAuth';
import css from './OAuthButtons.module.scss';

interface OAuthButtonsProps {
  actionText: string,
  onClose: () => void,
}

export const OAuthButtons = ({ actionText, onClose }: OAuthButtonsProps) => {
  const { googleAuthSignIn } = useGoogleAuthSignIn();
  
  const onSubmit = async () => {
    const user = await googleAuthSignIn();
    if(user) {
      onClose()
    }
  }

  return (
   <div className={css.OAuthButtons}>
      <AuthButton text={`${actionText} with google`} logo={GoogleIcon} onClick={onSubmit} />
    </div>
  )
};