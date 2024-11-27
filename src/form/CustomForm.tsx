import { useState } from "react";
import CustomDatePicker from "./CustomDatePicker";
import CustomInput from "./CustomInput";
import CustomSlider from "./CustomSlider";
import DragAndDrop from "./DragAndDrop";

interface IFormData {
    firstName: string;
    secondName: string;
    emailAdress: string;
    age: number;
    files: any[];
    date: string;
}

function CustomForm() {
    const [formData, setFormData] = useState<IFormData>({
        firstName: "",
        secondName: "",
        emailAdress: "",
        age: 8,
        files: [],
        date: "",
    });
    console.log(formData);
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
            />
            <CustomInput
                label="Last Name"
                field="secondName"
                value={formData.secondName}
                setFormData={setFormData}
            />
            <CustomInput
                label="Email Address"
                field="emailAdress"
                value={formData.emailAdress}
                setFormData={setFormData}
            />
            <CustomSlider min={8} max={100} step={1} initialValue={8} />
            {/* <DragAndDrop onFileUpload={() => {}} /> */}
            <CustomDatePicker />
            <button className="rounded-lg p-2 focus:outline-none focus:ring-2 bg-inactivePurple text-white">
                Send Application
            </button>
        </div>
    );
}

export default CustomForm;
