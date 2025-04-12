import { Slider } from "@/components/ui/slider"

import React, { useState, useEffect } from 'react';
import { useCurrentChar, useCurrentCharDispatch } from "@/contexts/CurrentCharContext";

const getMaxSkillLevelFromMindscapeLevel = (mindscapeLevel) => {
    if(mindscapeLevel >= 5) {
        return 16;
    }
    if(mindscapeLevel >= 3) {
        return 14;
    }
    return 12;
}

const getMinSkillLevelFromMindscapeLevel = (mindscapeLevel) => {
    if(mindscapeLevel >= 5) {
        return 5;
    }
    if(mindscapeLevel >= 3) {
        return 3;
    }
    return 1;
}

const LevelSelectSlider = (props) => {
    const skill = props.skill
    const currentChar = useCurrentChar();
    const currentCharDispatch = useCurrentCharDispatch();

    const mindscapeLevel = currentChar.mindscapeLevel;
    const [maxLevel, setMaxLevel] = useState(getMaxSkillLevelFromMindscapeLevel(mindscapeLevel));
    const [minLevel, setMinLevel] = useState(getMinSkillLevelFromMindscapeLevel(mindscapeLevel));

    useEffect(() => {
        setMinLevel(getMinSkillLevelFromMindscapeLevel(mindscapeLevel));
        setMaxLevel(getMaxSkillLevelFromMindscapeLevel(mindscapeLevel));
    }, [mindscapeLevel]);

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

    return (
        <div className="flex w-full gap-2">
            <Slider value={[skillLevel]} max={maxLevel} min={minLevel} step={1} onValueChange={(i) => {handleChange(skillNameParam, i)}} className="w-full"/>
            <div className="inline-block align-bottom">
                {skillLevel}
                <span className="ml-1 text-xs text-muted-foreground">/{maxLevel}</span>
            </div>
        </div>
    );
} ;

export default LevelSelectSlider;