import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@sudoku/ui/web/Input/Input";
import { useForm } from "react-hook-form";
// import { useSignIn } from '../hooks/useSignIn';
import { useSignIn } from 'modules/auth';
import { signInSchema, type SignInFormData } from '../AuthModal/schemas/SignInForm.schema';
import { OAuthButtons } from '../OAuthButtons/OAuthButtons';
import css from './SignForm.module.scss';

interface SignInFormProps {
  onToggleMode: () => void,
  onClose: () => void,
  onForgotPassword: () => void,
  setIsLoading: (isLoading: boolean) => void,
}

export const SignInForm = ({
  onToggleMode,
  onClose,
  onForgotPassword,
  setIsLoading }: SignInFormProps
) => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>({ resolver: zodResolver(signInSchema) })
  const { error, signIn } = useSignIn();

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    const user = await signIn(data.email, data.password)
    if (user) {
      onClose()
    }
    setIsLoading(false);
  })

  return (
    <div className={css.signForm}>
      <h1 className={css.signForm__title}> Welcome Back! </h1>
      <OAuthButtons actionText="Sign in" onClose={onClose} />
      <form className={css.signForm__form} onSubmit={onSubmit}>
        <div className={css.signForm__divider}>
          <span>or Sign in with email</span>
        </div>
        <div className={css.signForm__fields}>
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
          <button
            type="button"
            className={css.signForm__forgotPassword}
            onClick={onForgotPassword}
          >
            Forgot password?
          </button>
        </div>
        <p className={css.signForm__error}>{error || '\u00A0'}</p>
        <button className={css.signForm__submitBtn}>Sign in</button>
      </form>
      <footer className={css.signForm__footer}>
        <p>
          Don't have an account?
          <button
            type="button"
            className={css.signForm__footerBtn}
            onClick={onToggleMode}
          >
            <span>Sign up</span>
          </button>
        </p>
      </footer>
    </div>
  )};