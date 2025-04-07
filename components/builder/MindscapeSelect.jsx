"use client"

import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import React, { useEffect } from 'react';
import { useCurrentChar, useCurrentCharDispatch } from "@/contexts/CurrentCharContext";

const CoreSkillToggle = () => {
    const currentChar = useCurrentChar();
    const currentCharDispatch = useCurrentCharDispatch();

    useEffect(() => {
            document.getElementById(currentChar.mindscapeLevel).scrollIntoView({block: 'nearest', inline: 'start' });
        }, []);

    const handleIncrease = () => {
        if (currentChar.mindscapeLevel < 6){
            currentCharDispatch({ type: 'update', name: 'mindscapeLevel', value: currentChar.mindscapeLevel + 1 });
            document.getElementById(currentChar.mindscapeLevel + 1).scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        }
    };
    const handleDecrease = (skill, level) => {
        if (currentChar.mindscapeLevel > 0){
            currentCharDispatch({ type: 'update', name: 'mindscapeLevel', value: currentChar.mindscapeLevel - 1 });
            document.getElementById(currentChar.mindscapeLevel - 1).scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        }
    };


    return (
            <div className="flex relative items-center justify-between gap-2">
                <Button variant="outline" size="icon" onClick={handleDecrease} className="size-8 xl:size-10">
                    <Minus className="w-4 h-4"/>
                </Button>
                    <div className="flex flex-row flex-nowrap text-center gap-2 w-14 xl:w-24 overflow-hidden">
                        <p id={0} className="text-4xl xl:text-6xl font-bold">M0</p>
                        <p id={1} className="text-4xl xl:text-6xl font-bold">M1</p>
                        <p id={2} className="text-4xl xl:text-6xl font-bold">M2</p>
                        <p id={3} className="text-4xl xl:text-6xl font-bold">M3</p>
                        <p id={4} className="text-4xl xl:text-6xl font-bold">M4</p>
                        <p id={5} className="text-4xl xl:text-6xl font-bold">M5</p>
                        <p id={6} className="text-4xl xl:text-6xl font-bold">M6</p>
                    </div>
                <Button variant="outline" size="icon" onClick={handleIncrease} className="size-8 xl:size-10">
                    <Plus className="h-4 w-4" />
                </Button>
            </div>
    )
}

export default CoreSkillToggle;