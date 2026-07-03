type TopBarProps = {
  title: string
}

function TopBar({ title }: TopBarProps) {
  return (
    <header className="topbar">
      <div>
        <p className="topbar__eyebrow">Library</p>
        <h1 className="topbar__title">{title}</h1>
      </div>

      <label className="topbar__search" aria-label="Search">
        <span className="topbar__search-icon" aria-hidden="true">
          Search
        </span>
        <input
          className="topbar__search-input"
          type="search"
          placeholder="Search components"
        />
      </label>
    </header>
  )
}

export default TopBar
