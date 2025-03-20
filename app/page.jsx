"use client"; // This is a client-side only module

import React from "react";
import CharSelect from "@/components/CharSelect";
import { useState } from "react";
import { useChars } from "@/hooks/useChars";
import { stdStatsCalculator } from "@/libs/stdStatsCalculator";
import { moveValueCalc } from "@/libs/moveCalculator";
import { getCharFullBodyImg } from "@/lib/utils"

import {
    Card,
    CardContent,
} from "@/components/ui/card";
import getAvatarImg from "@/lib/utils";

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
    <Card className="character-info-card rounded-3xl border-2 bg-[auto_5px] bg-[url(https://wiki.hoyolab.com/_nuxt/img/card-shading-bg.706c7b9.png)] bg-repeat">
        <CardContent>
            <div className="mt-5">
                <CharSelect values={chars} value={selectedCharName} onChange={setSelectedCharName} />
            </div>
            
            {selectedChar && (
              <div className="flex justify-between flex-col md:flex-row">
                <div className="md:order-last p-2 flex md:w-1/2">
                    <img className="drop-shadow-2xl" alt="test" src={getCharFullBodyImg(selectedCharName)}/>
                </div>
                <div className="mt-5 md:w-1/2">
                    <p className="text-5xl">{selectedChar.charInfo.charName}</p>
                    <div className="flex flex-row md:flex-col space-x-1 md:space-x-0 py-1">
                      <div className="flex flex-row py-1">
                        <p className="hidden md:block text-3xl self-center"> {selectedChar.charInfo.charFaction}</p>
                        <img className="character-info-card-info-icon md:ml-2 md:w-[3rem]" src="https://act-upload.hoyoverse.com/event-ugc-hoyowiki/2025/01/03/99550110/5d8267a1f12bdb48fb4f8974ab755ffe_3064048326243400422.png"></img>
                      </div>
                      <div className="flex flex-row">
                        <img className="character-info-card-info-icon" src="https://act-webstatic.hoyoverse.com/event-static-hoyowiki-admin/2024/05/07/f7bdcd7c6574c22e6c90f25cae025376_3782022421620830515.png"></img>
                        <p className="hidden md:block text-2xl">{selectedChar.charInfo.charAttribute}</p>
                        <img className="character-info-card-info-icon md:ml-2" src="https://act-webstatic.hoyoverse.com/event-static-hoyowiki-admin/2024/05/07/78d407e2839038da13d26ad84b99a6b8_8151225937174652019.png"></img>
                        <p className="hidden md:block text-2xl">{selectedChar.charInfo.charType}</p>          
                      </div>
                    </div>
                </div>
              </div>
            )}
        </CardContent>
    </Card>
  );
}
