"use client"; // This is a client-side only module

import React from 'react';
import './CoreSkillToggle.css';

const CoreSkillToggle = (props) => {
    // Props
    const propCoreSkillLevel = props.coreSkillLevel;
    const propOnChange = props.onChange;
    
    const rows = ["A", "B", "C", "D", "E", "F"];

    const handleToggle = (toggledLevel) => {
        const newCoreSkillLevel = (toggledLevel === propCoreSkillLevel)? 0 : toggledLevel;
        propOnChange(newCoreSkillLevel);
    };

    return (
        <div className="flex flex-col gap-1 h-20 flex-wrap">
            {rows.map((row, i) => (
                <div key={i} onClick={() => {handleToggle(i + 1)}} className={'core-skill-toggle ' + ((i < propCoreSkillLevel)? 'active' : '')}>
                    <p>{row}</p>
                </div>
            ))}
        </div>
    );
};

export default CoreSkillToggle;