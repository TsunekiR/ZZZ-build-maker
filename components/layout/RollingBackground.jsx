import React from 'react';

const RollingBackground = () => {
    return (
        <div className="rolling-bg__cover-full pointer-events-none z-0">
            <div className="rolling-bg__cover-full linear-bg z-40"></div>
            <div className="rolling-bg__cover-full point-bg z-30"></div>
            <div className="rolling-bg__cover-full rolling-bg__content z-20 bg-stone-900 text-stone-800">
                <div className="rolling-bg__scroll-wrapper z-2">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <ul key={i} className={"rolling-bg__ul animation_" + ((i % 2) + 1)}>
                            {Array.from({ length: 12 }).map((_, j) => {
                                const label = j % 3 === 0 ? "ZENLESS" : j % 3 === 1 ? "ZONE" : "ZERO";
                                return <li key={j}>{label}</li>
                            })}
                        </ul>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RollingBackground;