import React from "react";

interface ICancelIcon {
    onClick: (e: any) => void;
}

const CancelIcon: React.FC<ICancelIcon> = ({ onClick }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            onClick={onClick}
            className="cursor-pointer"
        >
            <circle cx="12" cy="12" r="12" fill="#001A72" />
            <line
                x1="8"
                y1="8"
                x2="16"
                y2="16"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <line
                x1="16"
                y1="8"
                x2="8"
                y2="16"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
};

export default CancelIcon;
