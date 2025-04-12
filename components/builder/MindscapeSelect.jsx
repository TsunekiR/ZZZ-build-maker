"use client"

import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import React, { useEffect } from 'react';
import { useCurrentChar, useCurrentCharDispatch } from "@/contexts/CurrentCharContext";

const MindscapeSelect = () => {
    const currentChar = useCurrentChar();
    const currentCharDispatch = useCurrentCharDispatch();

    useEffect(() => {
            document.getElementById(currentChar.mindscapeLevel).scrollIntoView({block: 'nearest', inline: 'start' });
        }, []);

    useEffect(() => {
        function handleResize() {
            document.getElementById(currentChar.mindscapeLevel) && document.getElementById(currentChar.mindscapeLevel).scrollIntoView({block: 'nearest', inline: 'start' });
        }
        window.addEventListener('resize', handleResize)
    })

    const dispatchBatchSkillChange = (isIncrease) => {
        dispatchSkillChange(isIncrease, "basicAttackLevel");
        dispatchSkillChange(isIncrease, "dodgeLevel");
        dispatchSkillChange(isIncrease, "assistLevel");
        dispatchSkillChange(isIncrease, "specialAttackLevel");
        dispatchSkillChange(isIncrease, "chainAttackLevel");
    }

    const dispatchSkillChange = (isIncrease, skill) => {
        const currentLevel = parseInt(currentChar.skillLevels[skill]);
        const newLevel = isIncrease ? (currentLevel + 2) : (currentLevel - 2);

        currentCharDispatch({ type: 'updateSkill', name: skill, value: newLevel });
    }

    const handleIncrease = () => {
        handleChange(true);
    };
    const handleDecrease = () => {
        handleChange(false);
    };
    const handleChange = (isIncrease) => {
        const canChange = isIncrease ? currentChar.mindscapeLevel < 6 : currentChar.mindscapeLevel > 0;
        if (canChange) {
            const newLevel = isIncrease ? currentChar.mindscapeLevel + 1 : currentChar.mindscapeLevel - 1;

            currentCharDispatch({ type: 'update', name: 'mindscapeLevel', value: newLevel });
            const isChangeSkills = isIncrease && (newLevel === 3 || newLevel === 5) || !isIncrease && (newLevel === 2 || newLevel === 4);
            if (isChangeSkills) {
                dispatchBatchSkillChange(isIncrease);
            }
            
            // Scroll to the new level
            document.getElementById(newLevel).scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        }
    }


    return (
            <div className="flex relative items-center justify-between gap-2">
                <Button variant="outline" size="icon" onClick={handleDecrease} className="size-8 xl:size-10">
                    <Minus className="w-4 h-4"/>
                </Button>
                    <div className="flex flex-row flex-nowrap text-center gap-2 w-[3.6rem] xl:w-24 overflow-hidden">
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

export default MindscapeSelect;