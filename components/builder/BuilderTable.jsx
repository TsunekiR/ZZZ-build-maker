import React from 'react';

const renderRow = (label, value) => {
    return (
        <div className="character-stats-text px-5">
            <p>{label}</p>
            <p>{value}</p>
        </div>
    );
};

const BuilderTable = (props) => {
    const { data, title } = props;

    return (
        <div className="p-2 flex flex-row flex-wrap md:pr-6 xl:pr-2">
            <p className="text-3xl self-center">{title}</p>
            <div className='flex flex-wrap'>
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