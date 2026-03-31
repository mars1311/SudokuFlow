import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import css from './AuthModal.module.scss';
import { Input } from '../ui/Input/Input';
import { useSignUp } from '../../hooks/useSignUp';
import { signUpSchema } from './schemas/SignUpForm.schema';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignUpFormProps {
  onClose: () => void,
  // onLoadingChange: (isLoading: boolean) => void,
}

export const SignUpForm = ({ onClose }: SignUpFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(signUpSchema) })
  const { error, signUp } = useSignUp();


  const onSubmit = handleSubmit(async (data) => {
    const user = await signUp(data.name, data.email, data.password)
    if (user) {
      onClose()
    }
  })

  return (
    <form className={css.authModal__form} onSubmit={onSubmit}>
      <>
        <div className={css.authModal__divider}>
          <span>or sign up with email</span>
        </div>
        <div className={css.authModal__fields}>
          <Input
            label="Full Name"
            id="name"
            type="text"
            placeholder="Enter your full name"
            autoComplete="name"
            error={errors.name?.message}
            autoFocus
            {...register('name')}
          />
          <Input
            label="Email Address"
            id="email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            error={errors.email?.message}
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
          <Input
            label="Confirm Password"
            id="confirm-password"
            type="password"
            placeholder="Confirm your password"
            autoComplete="new-password"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />
        </div>
        {error && <p className={css.authModal__error}>Error: {error}</p>}
        <button type="submit" className={css.authModal__submit}> Sign Up </button>
      </>
    </form>
  );
};