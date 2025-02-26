"use client"; // This is a client-side only module
import React from "react";
import CharSelect from "@/components/CharSelect";
import { useState } from "react";
import { useChars } from "@/hooks/useChars";
import { stdStatsCalculator } from "@/models/stdStatsCalculator";
import { moveValueCalc } from "@/models/moveCalculator";

export default function Home() {
  // State
  const chars = useChars();
  const [selectedCharName, setSelectedCharName] = useState("");

  // Derived state
  const selectedChar = chars?.find((char) => char.charInfo.charName === selectedCharName);

  if (selectedChar){
    let coreSkillLevel = 6;
    let mindscapeLevel = 2;
    let skillLevel = 1;
    let selectedCharMoveValues = moveValueCalc(selectedChar, coreSkillLevel, mindscapeLevel, skillLevel)
    let selectedCharStdStats = stdStatsCalculator(selectedChar, coreSkillLevel)
    console.log(selectedCharStdStats)
    console.log(selectedCharMoveValues)
  }

  console.log(selectedChar)

  return (
    <div className="p-5">
      <p className="text-2xl">ZZZ build Maker Tool</p>

      <div className="mt-5">
        <CharSelect values={chars} value={selectedCharName} onChange={setSelectedCharName} />
      </div>
      
      {selectedChar && (
        <div className="mt-5">
          <p>{selectedChar.charInfo.charType}</p>
          <p>{selectedChar.charBaseStats.atk}</p>
        </div>
      )}
    </div>
  );
}
