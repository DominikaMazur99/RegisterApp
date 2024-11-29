import React from "react";
import { SliderProps } from "../interfaces/interfaces";
import "./form.css";

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
        <div className="flex flex-col gap-2 pb-6">
            {/* Label */}
            <p className="font-sans font-medium text-base leading-5 text-gray-900 text-[16px]">
                Age
            </p>

            <div className="w-full flex flex-col gap-1">
                <div className="flex justify-between text-[12px] text-gray-600">
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
                        className="w-full h-2 bg-inactivePurple rounded-full appearance-none focus:outline-none focus:ring-0"
                        style={{
                            background: `linear-gradient(to right, #761BE4 0%, #761BE4 ${
                                ((value - min) / (max - min)) * 100
                            }%, #CBB6E5 ${
                                ((value - min) / (max - min)) * 100
                            }%, #CBB6E5 100%)`,
                        }}
                    />

                    <div
                        className="absolute bg-white text-purple-700 text-sm px-2 py-1 rounded-lg shadow-md border border-gray-200"
                        style={{
                            left: calculatePosition(),
                            top: "28px",
                        }}
                    >
                        {value}
                        <span className="absolute w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-white top-[-6px] left-1/2 transform -translate-x-1/2"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomSlider;
