import { useAuthModal } from '../../hooks/useAuthModal';
import { Modal } from '@sudoku/ui/web/Modal/Modal';
import { PasswordRecovery } from '../PasswordRecovery/PasswordRecovery';
import { SignInForm } from '../SignForm/SignInForm';
import { SignUpForm } from 'modules/auth';

interface AuthModalProps {
  isOpen: boolean,
  onClose: () => void,
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const { mode, isLoading, error, toggleMode, setMode, setIsLoading } = useAuthModal();

const renderContent = () => {
    switch (mode) {
      case 'signin':
        return (
          <SignInForm
            onClose={onClose}
            onToggleMode={toggleMode}
            setIsLoading={setIsLoading}
            onForgotPassword={() => setMode('recovery')}
          />
        );
      case 'signup':
        return (
          <SignUpForm
            onClose={onClose}
            onToggleMode={toggleMode}
            setIsLoading={setIsLoading}
          />
        );
      case 'recovery':
        return <PasswordRecovery onBack={() => setMode('signin')} />;
      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isLoading={isLoading}>
      {error && <p>{error} </p>}
      {renderContent()}
    </Modal>
  );
}