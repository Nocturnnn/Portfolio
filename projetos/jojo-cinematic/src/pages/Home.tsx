import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { characters } from "../data/characters";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  const navigate = useNavigate();
  const characterList = Object.values(characters);

  const [activeIndex, setActiveIndex] = useState<number>(() => {
    return Number(localStorage.getItem("activeSlide")) || 0;
  });

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const theme = characterList[activeIndex].theme;
    document.documentElement.style.setProperty("--theme-color", theme);
    localStorage.setItem("activeSlide", activeIndex.toString());
  }, [activeIndex]);

  const handleHistory = () => {
    const character = characterList[activeIndex];
    navigate(`/history/${character.id}`);
  };

  return (
    <div className="hero">
      <button onClick={handleHistory}>History</button>

      {characterList.map((char, index) => (
        <div
          key={char.id}
          className={`slide ${index === activeIndex ? "active" : ""}`}
        >
          <h1>{char.name}</h1>
          <h3>{char.subtitle}</h3>
        </div>
      ))}

      <div className="pagination">
        {characterList.map((char, index) => (
          <span key={char.id} onClick={() => setActiveIndex(index)}>
            {char.name}
          </span>
        ))}
      </div>
    </div>
  );
}
