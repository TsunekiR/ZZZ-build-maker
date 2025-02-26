"use client"; // This is a client-side only module
import React from "react";

export default function CharSelect(props) {
    // Props
    const propValue = props.value;
    const propsValues = props.values;
    const propOnChange = props.onChange;

    // Methods
    const onChangeSelect = (value) => {
      propOnChange(value);
    }

    return (
        <>
        {/* TODO: Add Loading... */}

        {propsValues && propsValues.length === 0 && <p>No characters found</p>}

        {propsValues && propsValues.length !== 0 &&
            <select name="charSelect" id="charSelect" value={propValue} onChange={(e) => onChangeSelect(e.target.value)}>
                <option value={""}>-- Please select a character --</option>
                {propsValues?.map((char) => (
                    <option key={char.charInfo.charName} value={char.charInfo.charName}>
                    {char.charInfo.charName}
                    </option>
                ))}
            </select>
        }
        </>
    )
}