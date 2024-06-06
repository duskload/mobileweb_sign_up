import './Header.scss'

export function Header({ title }) {
  return (
    <div className="header-wrapper">
      <div className="header-wrapper--title">{title}</div>
    </div>
  )
}
