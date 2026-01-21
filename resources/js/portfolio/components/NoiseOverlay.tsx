import React from "react";

const NoiseOverlay: React.FC = () => (
    <div className="fixed inset-0 pointer-events-none z-[99] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
);

export default NoiseOverlay;
