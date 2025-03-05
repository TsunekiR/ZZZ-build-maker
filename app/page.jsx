"use client"; // This is a client-side only module
import React from "react";
import CharSelect from "@/components/CharSelect";
import { useState } from "react";
import { useChars } from "@/hooks/useChars";
import { stdStatsCalculator } from "@/libs/stdStatsCalculator";
import { moveValueCalc } from "@/libs/moveCalculator";
import {
    Card,
    CardContent,
} from "@/components/ui/card"

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
    <Card>
        <CardContent>
            <div className="mt-5">
                <CharSelect values={chars} value={selectedCharName} onChange={setSelectedCharName} />
            </div>
            
            {selectedChar && (
                <div className="mt-5">
                    <p>{selectedChar.charInfo.charType}</p>
                    <p>{selectedChar.charBaseStats.atk}</p>
                </div>
            )}
        </CardContent>
    </Card>
  );
}
