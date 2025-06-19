import './ThemeToggle.css';

const ThemeToggle = ({ temaOscuro, setTemaOscuro }) => {
  return (
    <div className="theme-toggle-container">
      <input
        type="checkbox"
        id="theme-toggle"
        className="theme-toggle-input"
        checked={temaOscuro}
        onChange={() => setTemaOscuro(!temaOscuro)}
      />
      <label htmlFor="theme-toggle" className="theme-toggle-label">
        <span className="theme-toggle-slider">
          <span className="theme-icon">
            {temaOscuro ? '🌙' : '☀️'}
          </span>
        </span>
      </label>
    </div>
  );
};

export default ThemeToggle;
