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
        <select name="charSelect" id="charSelect" value={propValue} onChange={(e) => onChangeSelect(e.target.value)}>
            <option value={""}>--Please select a character--</option>
        {propsValues && propsValues?.map((char) => (
            <option key={char._id} value={char.charName}>
              {char.charName}
            </option>
        ))}
        </select>
    )
}