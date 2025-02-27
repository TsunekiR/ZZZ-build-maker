"use client"; // This is a client-side only module
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import React from "react";

export default function CharSelect(props) {
    // Props
    const propValue = props.value;
    const propsValues = props.values;
    const propOnChange = props.onChange;

    return (
        <>
        {/* TODO: Add Loading... */}

        {propsValues && propsValues.length === 0 && <p>No characters found</p>}

        {propsValues && propsValues.length !== 0 &&
            <div className="flex flex-row gap-4">
                <Select onValueChange={propOnChange} value={propValue}>
                    <SelectTrigger>
                        <SelectValue placeholder="Please select a character" />
                    </SelectTrigger>
                    <SelectContent>
                        {propsValues?.map((char) => (
                            <SelectItem key={char.charInfo.charName} value={char.charInfo.charName}>
                                {char.charInfo.charName}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                
                <Button variant="destructive" onClick={() => propOnChange("")}>Clear</Button>
                {/* <select name="charSelect" id="charSelect" value={propValue} onChange={(e) => onChangeSelect(e.target.value)}>
                    {propsValues?.map((char) => (
                        <option key={char.charInfo.charName} value={char.charInfo.charName}>
                        {char.charInfo.charName}
                        </option>
                        ))}
                        </select> */}
            </div>
        }
        </>
    )
}