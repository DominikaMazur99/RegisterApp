import React, { useState } from "react";
import CancelIcon from "../icons/CancelIcon";
import { DragAndDropProps } from "../interfaces/interfaces";

const DragAndDrop: React.FC<DragAndDropProps> = ({ setFormData }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);

        const file = event.dataTransfer.files[0];
        if (file) {
            setFileName(file.name);
            setFormData((prev) => ({
                ...prev,
                file: file,
            }));
        }
    };

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name);
            setFormData((prev) => ({
                ...prev,
                file: file,
            }));
        }
    };

    const handleFileDelete = (
        e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
    ) => {
        e.stopPropagation();
        e.preventDefault();
        setFileName(null);
        setFormData((prev) => ({
            ...prev,
            file: null,
        }));
    };
    return (
        <div className="flex flex-col gap-2">
            <p className="font-sans font-normal text-base leading-5  text-textColor text-[16px]">
                Photo
            </p>
            <div
                className={`border border-inactivePurple rounded-lg p-2 bg-white h-32 flex items-center justify-center relative ${
                    isDragging ? "ring-2 ring-inactivePurple" : ""
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <label className="cursor-pointer">
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileSelect}
                    />
                    {fileName ? (
                        <div className="flex flex-row gap-1 justify-center items-center text-center">
                            <p className="text-textColor font-medium text-[16px]">
                                {fileName}
                            </p>
                            <CancelIcon
                                onClick={(e) => {
                                    handleFileDelete(e);
                                }}
                            />
                        </div>
                    ) : (
                        <div className="text-[#898DA9] text-[16px]">
                            <span className="text-purple-700 underline">
                                Upload a file
                            </span>{" "}
                            or drag and drop here
                        </div>
                    )}
                </label>
            </div>
        </div>
    );
};

export default DragAndDrop;
