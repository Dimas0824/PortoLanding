import React from "react";

export type AbstractLinesProps = {
    className?: string;
};

const AbstractLines: React.FC<AbstractLinesProps> = ({ className = "" }) => (
    <svg viewBox="0 0 420 520" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
        <defs>
            <linearGradient id="al_grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F2C18D" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#C2996B" stopOpacity="0.35" />
            </linearGradient>
        </defs>

        <path
            d="M73 83c48-58 114-70 164-45 55 28 95 101 90 172-5 70-36 130-92 169-54 37-126 50-186 18-65-34-95-116-86-196 6-56 31-92 110-118"
            fill="none"
            stroke="url(#al_grad)"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeDasharray="4 7"
        />
        <path
            d="M121 115c36-39 88-46 127-27 41 20 70 74 66 125-4 50-26 96-67 124-40 27-93 36-136 13-47-25-68-85-61-142 5-39 23-64 71-82"
            fill="none"
            stroke="#F2C18D"
            strokeOpacity="0.35"
            strokeWidth="1.2"
            strokeLinecap="round"
        />
        <circle cx="88" cy="140" r="4" fill="#F2C18D" fillOpacity="0.55" />
        <circle cx="312" cy="196" r="3" fill="#C2996B" fillOpacity="0.55" />
        <circle cx="282" cy="378" r="4" fill="#F2C18D" fillOpacity="0.4" />
    </svg>
);

export default AbstractLines;
