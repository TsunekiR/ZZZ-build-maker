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
} from "@/components/ui/card";
import CoreSkillToggle from "@/components/builder/CoreSkillToggle";
import { Badge } from "@/components/ui/badge";
import CardStats from "@/components/builder/Stats/CardStats";
import CardMoves from "@/components/builder/Moves/CardMoves";

export default function Home() {
    // State
    const chars = useChars();
    const [selectedCharName, setSelectedCharName] = useState("");
    const [coreSkillLevel, setCoreSkillLevel] = useState(0);

    // Derived state
    const selectedChar = chars?.find((char) => char.charInfo.charName === selectedCharName);

    let mindscapeLevel = 2;
    let skillLevel = 1;
    let selectedCharMoveValues = selectedChar? moveValueCalc(selectedChar, coreSkillLevel, mindscapeLevel, skillLevel): null;
    let selectedCharStdStats = selectedChar? stdStatsCalculator(selectedChar, coreSkillLevel): null;
    console.log(selectedCharStdStats);
    console.log(selectedCharMoveValues);

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
                                <img className="object-contain drop-shadow-2xl" alt="test" src={getCharHalfBodyImg(selectedCharName)}/>
                            </div>
                            <div className="mt-5 md:w-1/2">
                                <p className="xl:text-8xl text-6xl text-nowrap">{selectedChar.charInfo.charName}</p>
                                <div className="flex flex-row md:flex-col space-x-1 md:space-x-0 py-1">
                                    <div className="flex flex-row py-1">
                                        <p className="hidden md:block xl:text-5xl text-3xl font-light text-muted-foreground self-center"> {selectedChar.charInfo.charFaction}</p>
                                        <img className="md:ml-2 size-[3rem]" src={getFactionImg(selectedChar.charInfo.charFaction)}></img>
                                    </div>
                                    <div className="flex flex-row py-1 gap-x-1 md:gap-x-2">
                                        <Badge variant="secondary" className="rounded-full">
                                            <img className="character-info-card-icon" src={getAttributeImg(selectedChar.charInfo.charAttribute)}></img>
                                            <p className="hidden md:block text-2xl text-muted-foreground">{selectedChar.charInfo.charAttribute}</p>
                                        </Badge>
                                        <Badge variant="secondary" className="rounded-full">
                                            <img className="character-info-card-icon" src={getTypeImg(selectedChar.charInfo.charType)}></img>
                                            <p className="hidden md:block text-2xl text-muted-foreground">{selectedChar.charInfo.charType}</p>          
                                        </Badge>
                                    </div>
                                </div>
                                <div className="flex flex-row py-1">
                                    <CoreSkillToggle coreSkillLevel={coreSkillLevel} onChange={setCoreSkillLevel}/>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <CardStats selectedCharStdStats={selectedCharStdStats} />
                <CardMoves selectedCharMove={selectedCharMoveValues["basicAttack"]} title="Basic Attack" />
            </Suspense>
        )}

        </div>
  );
}
