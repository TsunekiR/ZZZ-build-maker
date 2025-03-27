import React from 'react';

const renderRow = (label, value) => {
    return (
        <div className="character-stats-text px-5">
            <p>{label}</p>
            <p>{Math.round(value*1000)/1000}</p>
        </div>
    );
};

const BuilderTable = (props) => {
    const { data, title } = props;

    return (
        <div className="p-2 flex flex-row flex-wrap xl:pr-0 w-full">
            <p className="text-3xl self-center">{title}</p>
            <div className='flex flex-wrap w-full'>
                {data.map((row, index) => (
                    <div className="flex justify-between flex-col w-full xl:w-1/2 xl:pr-2" key={index}>
                        {renderRow(row.label, row.value)}
                    </div>
                ))}
            </div>
        </div>        
    );
};

export default BuilderTable;