import { useEffect, useState } from "react";
import CustomDatePicker from "./CustomDatePicker";
import CustomInput from "./CustomInput";
import CustomSlider from "./CustomSlider";
import DragAndDrop from "./DragAndDrop";

interface IFormData {
    firstName: string;
    secondName: string;
    emailAdress: string;
    age: number;
    file: any;
    date: Date | null;
}

function CustomForm() {
    const [formData, setFormData] = useState<IFormData>({
        firstName: "",
        secondName: "",
        emailAdress: "",
        age: 8,
        file: null,
        date: null,
    });
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        const disabledCase =
            formData.firstName.length <= 0 ||
            formData.secondName.length <= 0 ||
            formData.emailAdress.length <= 0 ||
            !formData.file ||
            !formData.date;

        if (disabledCase) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    }, [formData]);

    console.log(formData, isDisabled);
    return (
        <div className="flex flex-col gap-4 h-full px-24 overflow-y-auto p-4">
            <p className="font-sans font-normal leading-5 text-textColor text-xl">
                Personal Info
            </p>
            <CustomInput
                label="First Name"
                field="firstName"
                value={formData.firstName}
                setFormData={setFormData}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
            />
            <CustomInput
                label="Last Name"
                field="secondName"
                value={formData.secondName}
                setFormData={setFormData}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
            />
            <CustomInput
                label="Email Address"
                field="emailAdress"
                value={formData.emailAdress}
                setFormData={setFormData}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
            />
            <CustomSlider
                min={8}
                max={100}
                step={1}
                field="age"
                value={formData.age}
                setFormData={setFormData}
            />
            <DragAndDrop setFormData={setFormData} />
            <CustomDatePicker setFormData={setFormData} value={formData.date} />
            <button
                className={`rounded-lg p-2 focus:outline-none focus:ring-2 text-white ${
                    isDisabled
                        ? "bg-inactivePurple"
                        : "bg-defaultPurple hover:bg-hoverPurple"
                }`}
                disabled={isDisabled}
            >
                Send Application
            </button>
        </div>
    );
}

export default CustomForm;
