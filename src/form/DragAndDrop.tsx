import React, { useState } from "react";

interface DragAndDropProps {
    onFileUpload: (file: File) => void;
}

const DragAndDrop: React.FC<DragAndDropProps> = ({ onFileUpload }) => {
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
            onFileUpload(file);
        }
    };

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name);
            onFileUpload(file);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <p className="font-sans font-normal text-base leading-5 text-textColor">
                Photo
            </p>{" "}
            <div
                className="border border-inactivePurple rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-inactivePurple bg-[#FFFFFF] h-32 flex items-center justify-center"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleFileSelect}
                />
                {fileName ? (
                    <p className="text-purple-700 font-medium">{fileName}</p>
                ) : (
                    <div className="text-gray-500 text-sm">
                        <span className="text-purple-700 underline cursor-pointer">
                            Upload a file
                        </span>{" "}
                        or drag and drop here
                    </div>
                )}
            </div>
        </div>
    );
};

export default DragAndDrop;
