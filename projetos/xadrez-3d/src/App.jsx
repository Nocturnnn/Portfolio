import ChessScene from "./components/ChessScene";
import Content from "./components/Content";
import "./styles/style.css";

export default function App() {
  return (
    <section className="intro">
      <ChessScene />
      <Content />
    </section>
  );
}
