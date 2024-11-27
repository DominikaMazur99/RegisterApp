import CustomDatePicker from "./CustomDatePicker";
import CustomInput from "./CustomInput";
import CustomSlider from "./CustomSlider";
import DragAndDrop from "./DragAndDrop";

function CustomForm() {
    return (
        <div className="flex flex-col gap-4 h-full px-24 overflow-y-auto p-4">
            <CustomInput label="First Name" />
            <CustomInput label="Last Name" />
            <CustomInput label="Email Adress" />
            <CustomSlider min={8} max={100} step={1} initialValue={8} />
            <DragAndDrop onFileUpload={() => {}} />
            <CustomDatePicker />
        </div>
    );
}

export default CustomForm;
