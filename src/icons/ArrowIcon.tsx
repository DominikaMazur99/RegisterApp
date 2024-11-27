import React from "react";

interface ArrowProps {
    direction: "left" | "right";
}

const Arrow: React.FC<ArrowProps> = ({ direction }) => {
    const rotation = direction === "left" ? "rotate(-90deg)" : "rotate(90deg)";

    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: rotation, transformOrigin: "center" }} // Add transform and origin
            className="text-purple-300"
        >
            <path d="M8 16L0 0H16L8 16Z" fill="#CBB6E5" />
        </svg>
    );
};

export default Arrow;
