"use client"; // This is a client-side only module

import { cn, getAvatarImg } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronsUpDown, Check } from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useMemo, useState } from "react";
import Image from "next/image";

export default function CharSelect(props) {
    // Props
    const propValue = props.value;
    const propValues = props.values;
    const propOnChange = props.onChange;
    const [open, setOpen] = useState(false)

    const charsByFaction = useMemo(() => {
        if (!propValues) return null;
        const charsByFaction = {};
        propValues.forEach((char) => {
            if (!charsByFaction[char.charInfo.charFaction]) {
                charsByFaction[char.charInfo.charFaction] = [];
            }
            charsByFaction[char.charInfo.charFaction].push(char);
        });
        return charsByFaction;
    }, [propValues])

    return (
        <>
        {propValues === null && <p className="md:text-xl">Loading characters...</p>}

        {propValues && propValues.length === 0 && <p className="md:text-xl">No characters found</p>}

        {propValues && propValues.length !== 0 &&
            <div className="flex flex-row gap-4">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            size="xl"
                            className="text-muted-foreground w-full justify-between"
                            >
                            {propValue? 
                                propValue
                                : "Select character..."}
                            <ChevronsUpDown className="opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-[--radix-popover-trigger-width]" sideOffset={5}>
                        <Command>
                            <CommandInput placeholder="Search character..." className="h-9 md:text-lg" />
                            <CommandList>
                                <CommandEmpty>No character found.</CommandEmpty>
                                {charsByFaction && Object.keys(charsByFaction).map((faction) => (
                                    <CommandGroup key={faction} heading={faction}>
                                        {charsByFaction[faction].map((char) => (
                                            <CommandItem
                                                key={char.charInfo.charName}
                                                value={char.charInfo.charName}
                                                className="md:text-lg"
                                                onSelect={(currentValue) => {
                                                    propOnChange(currentValue)
                                                    setOpen(false)
                                                    }}>
                                                <Image alt={char.charInfo.charName} src={getAvatarImg(char.charInfo.charName)} width={20} height={20} />
                                                {char.charInfo.charName}
                                                <Check className={cn("ml-auto", propValue === char.charInfo.charName ? "opacity-100" : "opacity-0")}/>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                ))}
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
                
                <Button size="xl" onClick={() => propOnChange("")}>Clear</Button>
            </div>
        }
        </>
    )
}