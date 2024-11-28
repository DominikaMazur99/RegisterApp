import { useState } from "react";
import ErrorIcon from "../icons/ErrorIcon";

interface ICustomInput {
    label: string;
    field: string;
    value: string;
    setFormData: (update: (prev: any) => any) => void;
}

const CustomInput: React.FC<ICustomInput> = ({
    label,
    field,
    value,
    setFormData,
}) => {
    const [errorMessage, setErrorMessage] = useState<string>("");

    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setFormData((prev) => ({
            ...prev,
            [field]: newValue,
        }));
        if (field === "emailAdress") {
            if (!validateEmail(newValue)) {
                setErrorMessage(
                    "Please use correct formatting. Example: address@email.com"
                );
            } else {
                setErrorMessage("");
            }
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <p className="font-sans font-normal text-base leading-5 text-textColor">
                {label}
            </p>
            <input
                value={value || ""}
                onChange={handleChangeInput}
                className={`border  rounded-lg p-2 focus:outline-none focus:ring-2  ${
                    errorMessage.length > 0
                        ? "bg-errorBackground border-errorBorder focus:ring-errorBackground"
                        : "bg-[#FFFFFF] border-inactivePurple  "
                }`}
            />
            {errorMessage.length > 0 && (
                <div className="flex flex-row gap-1">
                    <ErrorIcon />
                    <p className="font-normal text-sm">{errorMessage}</p>
                </div>
            )}
        </div>
    );
};

export default CustomInput;
