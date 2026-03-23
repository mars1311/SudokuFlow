import css from './Input.module.scss';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string,
  type: string,
  id: string,
  placeholder?: string;
  value: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = ({ id, label, value, type, placeholder, onChange, ...props }: InputProps) => {
  return (
    <div className={css.input}>
      <label className={css.input__label}htmlFor={id}>{label}</label>
      <input
        className={css.input__field}
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...props }
      />
    </div>
  )
}