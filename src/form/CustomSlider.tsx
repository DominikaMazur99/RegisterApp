import React, { useState } from "react";
import "./form.css";

interface SliderProps {
    min: number;
    max: number;
    step: number;
    field: string;
    value: number;
    setFormData: (update: (prev: any) => any) => void;
}

const CustomSlider: React.FC<SliderProps> = ({
    min,
    max,
    step,
    value,
    field,
    setFormData,
}) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(event.target.value);
        setFormData((prev) => ({
            ...prev,
            [field]: newValue,
        }));
    };

    const calculatePosition = () => {
        const percentage = ((value - min) / (max - min)) * 100;
        return `calc(${percentage}% - 12px)`;
    };

    return (
        <div className="flex flex-col gap-0.025 pb-6">
            <p className="font-sans font-normal text-base leading-5 text-textColor">
                Age
            </p>
            <div className="w-full flex flex-col gap-0.025">
                <div className="flex justify-between text-sm text-gray-600">
                    <span>{min}</span>
                    <span>{max}</span>
                </div>
                <div className="relative w-full">
                    <input
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={value}
                        onChange={handleChange}
                        className="w-full h-1 bg-inactivePurple rounded-full appearance-none focus:outline-none focus:ring-0 slider"
                        style={{
                            background: `linear-gradient(to right, #A855F7 0%, #A855F7 ${
                                ((value - min) / (max - min)) * 100
                            }%, #CBB6E5 ${
                                ((value - min) / (max - min)) * 100
                            }%, #CBB6E5 100%)`,
                        }}
                    />
                    <span
                        className="absolute bg-white text-purple-700 text-sm px-3 py-1 rounded-lg shadow-md"
                        style={{
                            left: calculatePosition(),
                            top: "24px", // Move the box below the slider
                        }}
                    >
                        {value}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CustomSlider;
