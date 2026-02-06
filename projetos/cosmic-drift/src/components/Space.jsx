import { useEffect, useRef } from "react";
import { initStars } from "../effects/stars";
import "../styles/space.css";

export default function Space() {
  const spaceRef = useRef(null);

  useEffect(() => {
    if (spaceRef.current) {
      initStars(spaceRef.current);
    }
  }, []);

  return <div id="space" ref={spaceRef}></div>;
}
