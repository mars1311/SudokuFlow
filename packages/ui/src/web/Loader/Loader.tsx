import css from './Loader.module.scss'

export const Loader = () => {
  return (
    <div className={css.loader}>
      <div className={css.loader__spinner} />
    </div>
  )
}