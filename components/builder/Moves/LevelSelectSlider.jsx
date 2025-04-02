import { Slider } from "@/components/ui/slider"

import React from 'react';
import { CurrentCharProvider, useCurrentChar, useCurrentCharDispatch } from "@/contexts/CurrentCharContext";

const LevelSelectSlider = (props) => {
    const skill = props.skill
    const currentChar = useCurrentChar();
    const currentCharDispatch = useCurrentCharDispatch();
    
    function handleChangeCoreSkillLevel(skill, level) {
        currentCharDispatch({ type: 'update', name: skill, value: level });
    }
    
    const handleChange = (skill, level) => {
        handleChangeCoreSkillLevel(skill, level)
    };

    let chosenSkill = null
    let skillString = null
    switch(skill) {   
        case "Basic Attack" :
            chosenSkill = currentChar.basicAttackLevel;
            skillString = "basicAttackLevel";
            break
        case "Dash" :
            chosenSkill = currentChar.dashLevel;
            skillString = "dashLevel";
            break;
        default:
            break;
    }
    
    return (
        <div className="flex w-full gap-2">
            <Slider defaultValue={[12]} max={16} min={1} step={1} onValueChange={(i) => {handleChange(skillString, i)}} className="w-full"/>
            <p>{chosenSkill}</p>
        </div>
    );
} ;

export default LevelSelectSlider;