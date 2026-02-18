import { useParams, useNavigate } from "react-router-dom";
import { characters } from "../data/characters";
import { useEffect } from "../../node_modules/react";

export default function History() {
  const { id } = useParams();
  const navigate = useNavigate();

  const character = id ? characters[id] : null;

  useEffect(() => {
    if (character) {
      document.documentElement.style.setProperty(
        "--theme-color",
        character.theme,
      );
    }
  }, [character]);

  if (!character) return <div>Character not found</div>;

  return (
    <div className="history-container">
      <button onClick={() => navigate("/")}>Home</button>

      <h1>{character.name}</h1>
      <h3>{character.subtitle}</h3>
      <p>{character.history}</p>
    </div>
  );
}
