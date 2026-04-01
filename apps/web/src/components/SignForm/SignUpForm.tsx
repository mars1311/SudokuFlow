import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from '../ui/Input/Input';
import { useSignUp } from '../../hooks/useSignUp';
import { signUpSchema, type SignUpFormData } from '../AuthModal/schemas/SignUpForm.schema';
import { OAuthButtons } from '../OAuthButtons/OAuthButtons';
import css from './SignForm.module.scss';

interface SignUpFormProps {
  onToggleMode: () => void,
  onClose: () => void,
  setIsLoading: (isLoading: boolean) => void,
}

export const SignUpForm = (
  {
    onToggleMode,
    onClose,
    setIsLoading
  }: SignUpFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormData>({ resolver: zodResolver(signUpSchema) })
  const { error, signUp } = useSignUp();

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      const user = await signUp(data.name, data.email, data.password);
      if (user) {
        onClose();
      }
    } finally {
        setIsLoading(false);
      }
  });

  return (
    <div className={css.signForm}>
     <h1 className={css.signForm__title}>Don't lose your progress!</h1>
      <OAuthButtons actionText="Sign Up" onClose={onClose} />
      <form className={css.signForm__form} onSubmit={onSubmit}>
        <div className={css.signForm__divider}>
          <span>or Sign Up with email</span>
        </div>
        <div className={css.signForm__fields}>
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
        <p className={css.signForm__error}>{error || '\u00A0'}</p>
        <button type="submit" className={css.signForm__submitBtn}> Sign up </button>
      </form>
      <footer className={css.signForm__footer}>
        <p>
          Already have an account?
          <button
            type="button"
            className={css.signForm__footerBtn}
            onClick={onToggleMode}
          >
            <span>Sign in</span>
          </button>
        </p>
      </footer>
    </div>
  );
};