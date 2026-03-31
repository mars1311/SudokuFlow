import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import css from './AuthModal.module.scss';
import { Input } from '../ui/Input/Input';
import { useSignIn } from '../../hooks/useSignIn';
import { signInSchema } from './schemas/SignInForm.schema';
import { Loader } from '../ui/Loader/Loader';

interface FormData {
  email: string;
  password: string;
}

interface SignInFormProps {
  onClose: () => void,
  // onLoadingChange: (isLoading: boolean) => void,
}

export const SignInForm = ({ onClose, onLoadingChange }: SignInFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({resolver: zodResolver(signInSchema)})
  const { isLoading, error, signIn } = useSignIn();

  const onSubmit = handleSubmit(async (data) => {
    const user = await signIn(data.email, data.password)
    if (user) {
      onClose()
    }
  })

  return (
    <form className={css.authModal__form} onSubmit={onSubmit}>
      {isLoading ? <Loader /> : (
        <>
          <div className={css.authModal__divider}>
            <span>or sign up with email</span>
          </div>
          <div className={css.authModal__fields}>
            <Input
              label="Email Address"
              id="email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              error={errors.email?.message}
              autoFocus
              {...register('email')}
            />
            <Input
              label="Password"
              id="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="new-password"
              error={errors.password?.message}
              {...register('password')}
            />
          </div>
          {error && <p className={css.authModal__error}>Error: {error}</p>}
          <button className={css.authModal__submit}> Sign In </button>
        </>
      )}
    </form>
  );
};