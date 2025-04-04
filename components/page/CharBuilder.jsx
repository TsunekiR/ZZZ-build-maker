"use client"; // This is a client-side only module

import React, { Suspense, useMemo } from "react";
import CharSelect from "@/components/builder/CharSelect";
import { useChars } from "@/hooks/useChars";
import { stdStatsCalculator } from "@/libs/stdStatsCalculator";
import { combatStatsCalculator } from "@/libs/combatStatsCalculator";
import { moveValueCalc } from "@/libs/moveCalculator";
import { getCharHalfBodyImg, getFactionImg, getAttributeImg, getTypeImg } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card";
import CoreSkillToggle from "@/components/builder/CoreSkillToggle";
import { Badge } from "@/components/ui/badge";
import CardStats from "@/components/builder/Stats/CardStats";
import CardMoves from "@/components/builder/Moves/CardMoves";
import MindscapeSelect from "@/components/builder/MindscapeSelect";
import { useCurrentChar, useCurrentCharDispatch } from "@/contexts/CurrentCharContext";

export default function CharBuilder() {
    // State
    const chars = useChars();
    const currentChar = useCurrentChar();
    const currentCharDispatch = useCurrentCharDispatch();

    // Derived state
    const selectedChar = chars?.find((char) => char.charInfo.charName === currentChar?.charName);

    // Cached values
    let selectedCharStdStats = useMemo(() => {
        return selectedChar? stdStatsCalculator(selectedChar, currentChar.coreSkillLevel): null;
    }, [currentChar]);

    let selectedCharCombatStats = useMemo(() => {
        return selectedCharStdStats? combatStatsCalculator(selectedCharStdStats): null;
    }, [selectedCharStdStats]);
    
    let selectedCharMoveValues = useMemo(() => {
        return selectedChar? moveValueCalc(selectedChar, currentChar, selectedCharCombatStats): null;
    }, [currentChar]);

    // Handlers
    function handleCharSelect(name) {
        currentCharDispatch({ type: 'update', name: 'charName', value: name });
    }
    function handleChangeCoreSkillLevel(level) {
        currentCharDispatch({ type: 'update', name: 'coreSkillLevel', value: level });
    }

    return (
        <div className="flex flex-col gap-5">
            <Card>
                <CardContent>
                    <div className="mt-5">
                        <CharSelect values={chars} value={currentChar?.charName} onChange={handleCharSelect} />
                    </div>
                </CardContent>
            </Card>
            
            {selectedChar && (
                <Suspense fallback={<div>Loading...</div>}>
                    <Card>
                        <CardContent>
                            <div className="flex justify-between flex-col pt-4 md:flex-row">
                                <div className="md:order-last p-2 flex md:w-1/2">
                                    <img className="object-contain drop-shadow-2xl" alt="test" src={getCharHalfBodyImg(currentChar.charName)}/>
                                </div>
                                <div className="mt-5 md:w-1/2">
                                    <p className="xl:text-8xl md:text-6xl text-5xl xl:text-nowrap">{selectedChar.charInfo.charName}</p>
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
                                    <div className="flex flex-row py-1 gap-4">
                                        <CoreSkillToggle coreSkillLevel={currentChar.coreSkillLevel} onChange={handleChangeCoreSkillLevel}/>
                                        <MindscapeSelect />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <CardStats selectedCharStdStats={selectedCharStdStats} selectedCharCombatStats={selectedCharCombatStats} />
                    <CardMoves selectedCharMove={selectedCharMoveValues["basicAttack"]} title="Basic Attack" />

                    <div className="h-2" />
                </Suspense>
            )}

        </div>
  );
}
