"use client"; // This is a client-side only module

import React from 'react';
import './CoreSkillToggle.css';
import { cn } from '@/lib/utils';

const CoreSkillToggle = (props) => {
    // Props
    const propCoreSkillLevel = props.coreSkillLevel;
    const propOnChange = props.onChange;
    const propColor = props.color || "rgb(255, 255, 255)";
    
    const rows = ["A", "B", "C", "D", "E", "F"];
    
    let root = document.documentElement;
    root.style.setProperty('--core-skill-toggle-color', propColor);

    const handleToggle = (toggledLevel) => {
        const newCoreSkillLevel = (toggledLevel === propCoreSkillLevel)? 0 : toggledLevel;
        propOnChange(newCoreSkillLevel);
    };

    return (
        <div className="flex flex-col gap-1 h-20 xl:h-32 pt-1 xl:pt-2 flex-wrap">
            {rows.map((row, i) => (
                <div key={i} onClick={() => {handleToggle(i + 1)}} 
                    className={cn("core-skill-toggle core-skill-toggle-xl ", ((i < propCoreSkillLevel)? 'active ' : ' '))} >
                    <p>{row}</p>
                </div>
            ))}
        </div>
    );
};

export default CoreSkillToggle;