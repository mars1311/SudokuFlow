import { useState } from 'react';
import css from './AuthModal.module.scss';
import { Input } from '../Input/Input';
import { useSignUp } from '../../hooks/useSignUp';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const INITIAL_FORM: FormData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
    const [validationError, setValidationError] = useState<string | null>(null);
    const {isLoading, error, signUp} = useSignUp();

    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form className={css.authModal__form}>
      <div className={css.authModal__divider}>
        <span>or sign up with email</span>
      </div>
      <div className={css.authModal__fields}>
        <Input
          label="Full Name"
          id="name"
          name="name"
          type="text"
          value={formData.name}
          placeholder="Enter your full name"
          required
          onChange={handleChange}
          aria-required="true"
          autoComplete="name"
        />
        <Input
          label="Email Address"
          id="email"
          name="email"
          type="email"
          value={formData.email}
          placeholder="Enter your email"
          required
          onChange={handleChange}
          aria-required="true"
          autoComplete="email"
        />
        <Input
          label="Password"
          id="password"
          name="password"
          type="password"
          value={formData.password}
          placeholder="Enter your password"
          required
          onChange={handleChange}
          aria-required="true"
          autoComplete="new-password"
        />
        <Input
          label="Confirm Password"
          id="confirm-password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          placeholder="Confirm your password"
          required
          onChange={handleChange}
          aria-required="true"
          autoComplete="new-password"
        />
      </div>
      <button className={css.authModal__submit}> Sign Up </button>
    </form>
  );
};