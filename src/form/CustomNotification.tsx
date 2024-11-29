import React, { useEffect } from "react";

interface NotificationProps {
    message: string;
    type: "success" | "error";
    duration?: number;
    onClose: () => void;
}

const CustomNotification: React.FC<NotificationProps> = ({
    message,
    type,
    duration = 2000,
    onClose,
}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div
            className={`fixed top-5 right-5 z-50 p-4 rounded-lg shadow-lg text-white 
                ${type === "success" ? "bg-green-500" : "bg-[#FEECEC]"} 
                transition-all duration-300`}
        >
            {message}
        </div>
    );
};

export default CustomNotification;
