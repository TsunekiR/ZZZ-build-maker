"use client"; // This is a client-side only module
import React from "react";
import CharSelect from "@/components/CharSelect";
import { useState } from "react";
import { useChars } from "@/hooks/useChars";

function additionalDmgCalc(moveId,selectedChar) {
  let additionalDmg = 0;
  let buffList = selectedChar.charSelfBuffs.moves?.find((move) => move.id === moveId);

  if (buffList) {
    for (let index = 0; index < buffList.buffs.length; index++) {
      if(buffList.buffs[index].type === "additionalDmg"){
        additionalDmg += buffList.buffs[index].value[0]/100;
      }
    }
  }

  buffList = selectedChar.charSelfBuffs.moves?.find((move) => move.id === 0);

  if (buffList) {
    for (let index = 0; index < buffList.buffs.length; index++) {
      if(buffList.buffs[index].type === "additionalDmg"){
        additionalDmg += buffList.buffs[index].value[0]/100;
      }
    }
  }

  return(additionalDmg);
}

export default function Home() {
  // State
  const chars = useChars();
  const [selectedCharName, setSelectedCharName] = useState("");

  let basicAtkDmg = [];

  // Derived state
  const selectedChar = chars?.find((char) => char.charInfo.charName === selectedCharName);

  if (selectedChar){
    for (let index = 0; index < selectedChar.charInfo.moveList.basicAttack.length; index++) {
      basicAtkDmg[index] = 1 * (1 + additionalDmgCalc(index+1,selectedChar))
    }
  }

  console.log(basicAtkDmg)

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
