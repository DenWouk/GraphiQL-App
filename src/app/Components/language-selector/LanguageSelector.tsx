import './LanguageSelector.css';

export function LanguageSelector() {
  return (
    <select className="language-select" name="select">
      <option defaultValue="EN">EN</option>
      <option value="BY">BY</option>
      <option value="RU">RU</option>
      <option value="RU">UA</option>
    </select>
  );
}
