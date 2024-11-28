import { useState } from "react";
import ErrorIcon from "../icons/ErrorIcon";
import { validateEmail } from "../helpers/helpers";

interface ICustomInput {
    label: string;
    field: string;
    value: string;
    errorMessage: string;
    setErrorMessage: (error: string) => void;
    setFormData: (update: (prev: any) => any) => void;
}

const CustomInput: React.FC<ICustomInput> = ({
    label,
    field,
    value,
    errorMessage,
    setErrorMessage,
    setFormData,
}) => {
    const [isTouched, setIsTouched] = useState<boolean>(false);

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setFormData((prev) => ({
            ...prev,
            [field]: newValue,
        }));

        if (isTouched && field === "emailAdress") {
            if (!validateEmail(newValue)) {
                setErrorMessage(
                    "Please use correct formatting. Example: address@email.com"
                );
            } else {
                setErrorMessage("");
            }
        }
    };

    const handleBlur = () => {
        setIsTouched(true);
        if (field === "emailAdress" && !validateEmail(value)) {
            setErrorMessage(
                "Please use correct formatting. Example: address@email.com"
            );
        } else {
            setErrorMessage("");
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
                onBlur={handleBlur}
                className={`border  rounded-lg p-2 focus:outline-none focus:ring-2  ${
                    errorMessage.length > 0 && field === "emailAdress"
                        ? "bg-errorBackground border-errorBorder focus:ring-errorBackground"
                        : "bg-[#FFFFFF] border-inactivePurple  "
                }`}
            />
            {errorMessage.length > 0 && field === "emailAdress" && (
                <div className="flex flex-row gap-1">
                    <ErrorIcon />
                    <p className="font-normal text-sm">{errorMessage}</p>
                </div>
            )}
        </div>
    );
};

export default CustomInput;
