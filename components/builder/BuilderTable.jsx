import { Triangle } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { Accordion, AccordionContent, AccordionTrigger, AccordionItem } from '../ui/accordion';

const renderRow = (label, value) => {
    const previousValue = useRef();
    const delta = value - previousValue.current;

    const formattedValue = value.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    useEffect(() => {
        previousValue.current = value;
        return;
    });

    return (
        <div className="character-stats-text px-5">
            <p>{label}</p>
            {( (delta > 0 || delta < 0) ?  
                (<div key={value} className='flex flex-row gap-1 pulse-twice'>
                    {(delta > 0) && (
                        <Triangle width={10} height={20} className='text-green-600 fill-green-600 fade-out absolute opacity-0'/>
                    )}
                    {(delta < 0) && (
                        <Triangle width={10} height={20} className='rotate-180 text-red-600 fill-red-600 fade-out absolute opacity-0'/>
                    )}
                    <p>{formattedValue}</p>
                </div>) :
                (<div key={value} className='flex flex-row gap-1'>
                    <p>{formattedValue}</p>
                </div>)
            )}
        </div>
    );
};

const BuilderTable = (props) => {
    const { data, title, rowsPerLine } = props;

    //TODO: FAZER ESTA MERDA FICAR DINAMICA
    let wRow = ""
    switch(rowsPerLine) {
        case 1 :
            break
        case 2 :
            wRow = "xl:w-1/2";
            break;
        case 3 :
            wRow = "xl:w-1/3";
            break;
        default:
            console.log("BuilderTable warning: rowsPerLine must be [1-3]")
            break;
    }

    return (
        <div className="p-2 flex flex-row flex-wrap xl:pr-0 w-full">
            <Accordion type="single" collapsible className='w-full'>
                <AccordionItem value="item-1">
                    <AccordionTrigger className="w-full">
                        <p className="text-3xl self-center">{title}</p>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className='flex flex-wrap w-full pt-1'>
                            {data.map((row, index) => (
                                <div className={"flex justify-between flex-col xl:pr-2 w-full " + wRow} key={index}>
                                    {renderRow(row.label, row.value)}
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>        
    );
};

export default BuilderTable;