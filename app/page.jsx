"use client"; // This is a client-side only module
import React from "react";
import CharSelect from "@/components/CharSelect";
import { useState } from "react";
import { useChars } from "@/hooks/useChars";

export default function Home() {
  // State
  const chars = useChars();
  const [selectedCharName, setSelectedCharName] = useState("");

  // Derived state
  const selectedChar = chars?.find((char) => char.charName === selectedCharName);

  return (
    <div className="p-5">
      <p className="text-2xl">ZZZ build Maker Tool</p>

      <div className="mt-5">
        <CharSelect values={chars} value={selectedCharName} onChange={setSelectedCharName} />
      </div>
      
      {selectedChar && (
        <div className="mt-5">
          <p>{selectedChar.charName}</p>
          <p>{selectedChar.charType}</p>
          <p>{selectedChar.charBaseAttack}</p>
        </div>
      )}
    </div>
  );
}
