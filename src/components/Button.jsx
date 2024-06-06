import './Button.scss'

export function Button({ title }) {
  return (
    <button className="button-wrapper" type="submit">
      <div className="button-wrapper--title">{title}</div>
    </button>
  )
}
