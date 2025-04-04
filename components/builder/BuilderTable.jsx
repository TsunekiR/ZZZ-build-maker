import { Triangle } from 'lucide-react';
import { ChevronUp } from 'lucide-react';
import React from 'react';

const renderRow = (label, value) => {
    return (
        <div className="character-stats-text px-5">
            <p>{label}</p>
            <div key={value} className='flex flex-row gap-1 pulse-twice'>
                <p>{Math.round(value*1000)/1000}</p>
                {/* TODO: Compare with old value */}
                {/* <Triangle width={12} className='text-green-600 fill-green-600 fade-out absolute opacity-0'/> */}
                {/* <Triangle width={12} className='rotate-180 text-red-600 fill-red-600 fade-out absolute opacity-0'/> */}
            </div>
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
            <p className="text-3xl self-center">{title}</p>
            <div className='flex flex-wrap w-full'>
                {data.map((row, index) => (
                    <div className={"flex justify-between flex-col xl:pr-2 w-full " + wRow} key={index}>
                        {renderRow(row.label, row.value)}
                    </div>
                ))}
            </div>
        </div>        
    );
};

export default BuilderTable;