"use client"

import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCurrentChar, useCurrentCharDispatch } from "@/contexts/CurrentCharContext";

const CoreSkillToggle = () => {
    const currentChar = useCurrentChar();
    const currentCharDispatch = useCurrentCharDispatch();

    const handleIncrease = () => {
        if (currentChar.mindscapeLevel < 6){
            currentCharDispatch({ type: 'update', name: 'mindscapeLevel', value: currentChar.mindscapeLevel + 1 });
        }
    };
    const handleDecrease = (skill, level) => {
        if (currentChar.mindscapeLevel > 0){
            currentCharDispatch({ type: 'update', name: 'mindscapeLevel', value: currentChar.mindscapeLevel - 1 });
        }
    };


    return (
            <div className="flex items-center justify-between gap-2">
                <Button variant="outline" size="icon" onClick={handleDecrease} className="size-8 xl:size-10">
                    <Minus className="w-4 h-4"/>
                </Button>
                <div className="text-center">
                    <div className="text-4xl xl:text-6xl font-bold">M{currentChar.mindscapeLevel}</div>
                </div>
                <Button variant="outline" size="icon" onClick={handleIncrease} className="size-8 xl:size-10">
                    <Plus className="h-4 w-4" />
                </Button>
            </div>
    )
}

export default CoreSkillToggle;