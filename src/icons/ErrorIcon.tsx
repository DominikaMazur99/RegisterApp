import React from "react";

const ErrorIcon: React.FC = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
        >
            <circle cx="9" cy="9" r="9" fill="#FF4B4B" />
            <rect x="8" y="4" width="2" height="7" rx="1" fill="#FFFFFF" />
            <circle cx="9" cy="14" r="1" fill="#FFFFFF" />
        </svg>
    );
};

export default ErrorIcon;