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
            break
        case "Dodge" :
            skillLevel = currentChar.skillLevels["dodgeLevel"];
            skillNameParam = "dodgeLevel";
            break;
        case "Assist" :
            skillLevel = currentChar.skillLevels["assistLevel"];
            skillNameParam = "assistLevel";
            break;
        case "Special Attack" :
            skillLevel = currentChar.skillLevels["specialAttackLevel"];
            skillNameParam = "specialAttackLevel";
            break;
        case "Chain Attack" :
            skillLevel = currentChar.skillLevels["chainAttackLevel"];
            skillNameParam = "chainAttackLevel";
            break;
        default:
            break;
    }
    
    console.log(skillNameParam + ': ' + skillLevel )

    return (
        <div className="flex w-full gap-2">
            <Slider defaultValue={[skillLevel]} max={16} min={1} step={1} onValueChange={(i) => {handleChange(skillNameParam, i)}} className="w-full"/>
            <p>{skillLevel}</p>
        </div>
    );
} ;

export default LevelSelectSlider;