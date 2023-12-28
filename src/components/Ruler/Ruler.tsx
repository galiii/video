import React from 'react';
import "./Ruler.css"

interface RulerProps {
    rulerWidth: number;
    zoomFactor: number;
}

function Ruler({ rulerWidth, zoomFactor }: RulerProps): JSX.Element {
    const totalSeconds = 60; // assuming 60 seconds in a minute

    return (
        <div className="ruler">
            {Array.from({ length: totalSeconds }).map((_, index) => (
                <div
                    key={index}
                    className="ruler-mark"
                    style={{ width: `${rulerWidth * zoomFactor}px` }}
                >
                    {index}s
                </div>
            ))}
        </div>
    );
}

export default Ruler;
