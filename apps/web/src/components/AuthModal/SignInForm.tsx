import { useState } from 'react';
import css from './AuthModal.module.scss';
import { Input } from '../Input/Input';

export const SignInForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form className={css.authModal__form}>
      <div className={css.authModal__divider}>
        <span>or sign in with email</span>
      </div>
      <div className={css.authModal__fields}>
        <Input
          label="Email Address"
          id="email"
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
          id="password-field"
          type="password"
          name="password"
          value={formData.password}
          placeholder="Enter your password"
          required
          onChange={handleChange}
          aria-required="true"
          autoComplete="current-password"
        />
      </div>
      <button className={css.authModal__submit}> Sign In </button>
    </form>
  );
};