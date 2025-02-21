"use client"; // This is a client-side only module
import React from "react";
import CharSelect from "@/components/CharSelect";
import { useState, useEffect } from "react";

export default function Home() {
  // State
  const [selectedCharName, setSelectedCharName] = useState("");
  const [chars, setChars] = useState(null);

  // Derived state
  const selectedChar = chars?.find((char) => char.charName === selectedCharName);

  useEffect(() => {
    async function getChars() {
      try {
          console.log("Fetching characters...");
          const res = await fetch('http://localhost:3000/api/char');
          if(!res.ok) {
              throw new Error("Failed to fetch characters");
          }

          const resJSON = await res.json();
          setChars(resJSON.chars);
      } catch (error) {
          console.log("Error retrieving characters.", error);
      }
    }

    getChars();
  }, []);

  return (
    <div>
      <h1>ZZZ build Maker Tool</h1>

      <CharSelect values={chars} value={selectedCharName} onChange={setSelectedCharName} />
      
      {selectedChar && (
        <div>
          <h2>{selectedChar.charName}</h2>
          <p>{selectedChar.charType}</p>
          <p>{selectedChar.charBaseAttack}</p>
        </div>
      )}
    </div>
  );
}
