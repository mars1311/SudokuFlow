import css from './Input.module.scss';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string,
  type: string,
  id: string,
  placeholder?: string;
  error?: string;
};

export const Input = ({ id, label, type, placeholder, error, ...props }: InputProps) => {
  return (
    <div className={css.input}>
      <label className={css.input__label} htmlFor={id}>{label}</label>
      <input
        className={`${css.input__field} ${error ? css.input__field_isError : ''}`}
        id={id}
        type={type}
        placeholder={placeholder}
        {...props }
      />
      {error && <span className={css.input__error}>{error} </span>}
    </div>
  )
}