import React from "react";

export type CustomCursorProps = {
    mousePos: { x: number; y: number };
};

const CustomCursor: React.FC<CustomCursorProps> = ({ mousePos }) => (
    <div
        className="fixed w-6 h-6 border border-[#C2996B] rounded-full pointer-events-none z-[100] transition-transform duration-150 ease-out hidden md:block"
        style={{ transform: `translate(${mousePos.x - 12}px, ${mousePos.y - 12}px)` }}
    />
);

export default CustomCursor;
