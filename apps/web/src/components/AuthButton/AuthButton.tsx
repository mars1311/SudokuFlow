import css from './AuthButton.module.scss';

type AuthButtonProps = {
  text: string,
  logo: React.FC<React.SVGProps<SVGSVGElement>>,
}
export const AuthButton = ({text, logo: Logo} : AuthButtonProps) => {
  return (
    <button className={css.authButton}>
      <Logo />
      <span>Sign up with {text} </span>
    </button>
  )
}