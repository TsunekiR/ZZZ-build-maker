"use client"; // This is a client-side only module

import React, { Suspense } from "react";
import CharSelect from "@/components/builder/CharSelect";
import { useState } from "react";
import { useChars } from "@/hooks/useChars";
import { stdStatsCalculator } from "@/libs/stdStatsCalculator";
import { moveValueCalc } from "@/libs/moveCalculator";
import { getCharHalfBodyImg, getFactionImg, getAttributeImg, getTypeImg } from "@/lib/utils"

import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";

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

  return (
    <div className="flex flex-col gap-5">
    <Card>
        <CardContent>
            <div className="mt-5">
                <CharSelect values={chars} value={selectedCharName} onChange={setSelectedCharName} />
            </div>
        </CardContent>
    </Card>
    
    {selectedChar && (
        <Suspense fallback={<div>Loading...</div>}>
            <Card>
                <CardContent>
                    <div className="flex justify-between flex-col pt-4 md:flex-row">
                        <div className="md:order-last p-2 flex md:w-1/2">
                            <img className="drop-shadow-2xl" alt="test" src={getCharHalfBodyImg(selectedCharName)}/>
                        </div>
                        <div className="mt-5 md:w-1/2">
                            <p className="text-5xl">{selectedChar.charInfo.charName}</p>
                            <div className="flex flex-row md:flex-col space-x-1 md:space-x-0 py-1">
                            <div className="flex flex-row py-1">
                                <p className="hidden md:block text-3xl self-center"> {selectedChar.charInfo.charFaction}</p>
                                <img className="character-info-card-icon md:ml-2 md:size-[3rem]" src={getFactionImg(selectedChar.charInfo.charFaction)}></img>
                            </div>
                            <div className="flex flex-row py-1 md:gap-x-2">
                                <img className="character-info-card-icon" src={getAttributeImg(selectedChar.charInfo.charAttribute)}></img>
                                <p className="hidden md:block text-2xl">{selectedChar.charInfo.charAttribute}</p>
                                <img className="character-info-card-icon" src={getTypeImg(selectedChar.charInfo.charType)}></img>
                                <p className="hidden md:block text-2xl">{selectedChar.charInfo.charType}</p>          
                            </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                  Stats
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between flex-col md:flex-row">
                        <div className="p-2 md:w-1/2 md:pr-6">
                          <p className="text-3xl self-center">Base Stats</p>
                          <div className="flex justify-between flex-col xl:flex-row xl:gap-2">
                            <div className="flex flex-row justify-between rounded-full bg-[#000000] p-2 inline mt-2 xl:w-1/2">
                                <p>HP</p>
                                <p>100</p>
                            </div>
                            <div className="flex flex-row justify-between rounded-full bg-[#000000] p-2 inline mt-2 xl:w-1/2">
                                <p>ATK</p>
                                <p>100</p>
                            </div>
                          </div>
                          <div className="flex justify-between flex-col xl:flex-row xl:gap-2">
                            <div className="flex flex-row justify-between rounded-full bg-[#000000] p-2 inline mt-2 xl:w-1/2">
                                <p>DEF</p>
                                <p>100</p>
                            </div>
                            <div className="flex flex-row justify-between rounded-full bg-[#000000] p-2 inline mt-2 xl:w-1/2">
                                <p>Impact</p>
                                <p>100</p>
                            </div>
                          </div><div className="flex justify-between flex-col xl:flex-row xl:gap-2">
                            <div className="flex flex-row justify-between rounded-full bg-[#000000] p-2 inline mt-2 xl:w-1/2">
                                <p>CRIT Rate</p>
                                <p>100</p>
                            </div>
                            <div className="flex flex-row justify-between rounded-full bg-[#000000] p-2 inline mt-2 xl:w-1/2">
                                <p>CRIT DMG</p>
                                <p>100</p>
                            </div>
                          </div><div className="flex justify-between flex-col xl:flex-row xl:gap-2">
                            <div className="flex flex-row justify-between rounded-full bg-[#000000] p-2 inline mt-2 xl:w-1/2">
                                <p>Anomaly Mastery</p>
                                <p>100</p>
                            </div>
                            <div className="flex flex-row justify-between rounded-full bg-[#000000] p-2 inline mt-2 xl:w-1/2">
                                <p>Anomaly Proficiency</p>
                                <p>100</p>
                            </div>
                          </div><div className="flex justify-between flex-col xl:flex-row xl:gap-2">
                            <div className="flex flex-row justify-between rounded-full bg-[#000000] p-2 inline mt-2 xl:w-1/2">
                                <p>Pen Ratio</p>
                                <p>100</p>
                            </div>
                            <div className="flex flex-row justify-between rounded-full bg-[#000000] p-2 inline mt-2 xl:w-1/2">
                                <p>Energy Regen</p>
                                <p>100</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-2 md:w-1/2">
                          <p className="text-3xl self-center">Combat Stats</p>
                          <div className="flex justify-between flex-col xl:flex-row xl:gap-2">
                            <div className="flex flex-row justify-between rounded-full bg-[#000000] p-2 inline mt-2 xl:w-1/2">
                                <p>HP</p>
                                <p>100</p>
                            </div>
                            <div className="flex flex-row justify-between rounded-full bg-[#000000] p-2 inline mt-2 xl:w-1/2">
                                <p>ATK</p>
                                <p>100</p>
                            </div>
                          </div>
                          <div className="flex justify-between flex-col xl:flex-row xl:gap-2">
                            <div className="flex flex-row justify-between rounded-full bg-[#000000] p-2 inline mt-2 xl:w-1/2">
                                <p>DEF</p>
                                <p>100</p>
                            </div>
                            <div className="flex flex-row justify-between rounded-full bg-[#000000] p-2 inline mt-2 xl:w-1/2">
                                <p>Impact</p>
                                <p>100</p>
                            </div>
                          </div><div className="flex justify-between flex-col xl:flex-row xl:gap-2">
                            <div className="flex flex-row justify-between rounded-full bg-[#000000] p-2 inline mt-2 xl:w-1/2">
                                <p>CRIT Rate</p>
                                <p>100</p>
                            </div>
                            <div className="flex flex-row justify-between rounded-full bg-[#000000] p-2 inline mt-2 xl:w-1/2">
                                <p>CRIT DMG</p>
                                <p>100</p>
                            </div>
                          </div><div className="flex justify-between flex-col xl:flex-row xl:gap-2">
                            <div className="flex flex-row justify-between rounded-full bg-[#000000] p-2 inline mt-2 xl:w-1/2">
                                <p>Anomaly Mastery</p>
                                <p>100</p>
                            </div>
                            <div className="flex flex-row justify-between rounded-full bg-[#000000] p-2 inline mt-2 xl:w-1/2">
                                <p>Anomaly Proficiency</p>
                                <p>100</p>
                            </div>
                          </div><div className="flex justify-between flex-col xl:flex-row xl:gap-2">
                            <div className="flex flex-row justify-between rounded-full bg-[#000000] p-2 inline mt-2 xl:w-1/2">
                                <p>Pen Ratio</p>
                                <p>100</p>
                            </div>
                            <div className="flex flex-row justify-between rounded-full bg-[#000000] p-2 inline mt-2 xl:w-1/2">
                                <p>Energy Regen</p>
                                <p>100</p>
                            </div>
                          </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Suspense>
    )}

    </div>
  );
}
