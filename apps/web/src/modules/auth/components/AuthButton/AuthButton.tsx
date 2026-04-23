import css from './AuthButton.module.scss';

type AuthButtonProps = {
  text: string,
  logo: React.ElementType,
  onClick: () => void,
}

export const AuthButton = ({text, logo: Logo, onClick} : AuthButtonProps) => {
  return (
    <button className={css.authButton} onClick={onClick}>
      <Logo />
      <span> {text} </span>
    </button>
  )
}