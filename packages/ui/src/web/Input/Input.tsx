import { useState } from 'react';
import { Eye, EyeOff } from "lucide-react";
import css from './Input.module.scss';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string,
  type: string,
  id: string,
  placeholder?: string;
  error?: string;
};

export const Input = ({ id, label, type, placeholder, error, ...props }: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const showPasswordBtn = (<button
    type="button"
    onClick={() => setShowPassword((prev) => !prev)}
    aria-label={showPassword ? "Hide password" : "Show password"}
    className={css.input__passwordBtn}
  >
    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
  </button>)

  return (
    <div className={css.input}>
      <label className={css.input__label} htmlFor={id}>{label}</label>
      <div className={css.input__inputContainer}>
        <input
          className={`${css.input__field} ${error ? css.input__field_isError : ''}`}
          id={id}
          type={showPassword ? "text" : type}
          placeholder={placeholder}
          {...props}
        />
        {isPassword && showPasswordBtn}
      </div>
      {error && <span className={css.input__error}>{error} </span>}
    </div>
  )
}