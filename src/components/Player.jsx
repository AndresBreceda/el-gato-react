import { useState } from "react";

export default function Player({ name, symbol, isActive }) {
  const [isName, setIsName] = useState(name); // Initialize with `name` prop
  const [isEditing, setIsEditing] = useState(false);

  function handleName(event) {
    setIsName(event.target.value); // Update the name state
  }

  function handleClick() {
    if (isEditing) {
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  }

  let playerName = <span className="player-name">{isName}</span>;
  let btn = "edit";

  if (isEditing) {
    playerName = (
      <input
        type="text"
        value={isName} // Use `isName` as the input value
        required
        onChange={handleName}
      />
    );
    btn = "save";
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {playerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleClick}>{btn}</button>
    </li>
  );
}
