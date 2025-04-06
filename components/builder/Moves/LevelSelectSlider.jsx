import { Slider } from "@/components/ui/slider"

import React from 'react';
import { useCurrentChar, useCurrentCharDispatch } from "@/contexts/CurrentCharContext";

const LevelSelectSlider = (props) => {
    const skill = props.skill
    const currentChar = useCurrentChar();
    const currentCharDispatch = useCurrentCharDispatch();
    
    const handleChange = (skill, level) => {
        currentCharDispatch({ type: 'updateSkill', name: skill, value: level });
    };

    let skillLevel = null
    let skillNameParam = null
    switch(skill) {   
        case "Basic Attack" :
            skillLevel = currentChar.skillLevels["basicAttackLevel"];
            skillNameParam = "basicAttackLevel";
            console.log(skill)
            break
        case "Dodge" :
            skillLevel = currentChar.skillLevels["dodge"];
            skillNameParam = "dodgeLevel";
            console.log(skill)
            break;
        case "Assist" :
            skillLevel = currentChar.skillLevels["assist"];
            skillNameParam = "assistLevel";
            console.log(skill)
            break;
        case "Special Attack" :
            skillLevel = currentChar.skillLevels["specialAttack"];
            skillNameParam = "specialAttackLevel";
            console.log(skill)
            break;
        case "Chain Attack" :
            skillLevel = currentChar.skillLevels["chainAttack"];
            skillNameParam = "chainAttackLevel";
            console.log(skill)
            break;
        default:
            break;
    }
    
    return (
        <div className="flex w-full gap-2">
            <Slider defaultValue={[skillLevel]} max={16} min={1} step={1} onValueChange={(i) => {handleChange(skillNameParam, i)}} className="w-full"/>
            <p>{skillLevel}</p>
        </div>
    );
} ;

export default LevelSelectSlider;