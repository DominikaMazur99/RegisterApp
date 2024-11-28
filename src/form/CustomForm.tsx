import { useEffect, useState } from "react";
import CustomDatePicker from "./CustomDatePicker";
import CustomInput from "./CustomInput";
import CustomSlider from "./CustomSlider";
import DragAndDrop from "./DragAndDrop";
import { IFormData } from "../interfaces/interfaces";
import { submitFormFunction } from "../api/api";
import CustomNotification from "./CustomNotification";

function CustomForm() {
    const [formData, setFormData] = useState<IFormData>({
        firstName: "",
        secondName: "",
        emailAdress: "",
        age: 8,
        file: null,
        date: null,
        hour: null,
    });
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [responseMessage, setResponseMessage] = useState<string>("");
    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState<
        "success" | "error"
    >("success");

    useEffect(() => {
        const disabledCase =
            formData.firstName.length <= 0 ||
            formData.secondName.length <= 0 ||
            formData.emailAdress.length <= 0 ||
            !formData.file ||
            !formData.date ||
            !formData.hour;

        if (disabledCase) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    }, [formData]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await submitFormFunction({
            url: "http://letsworkout.pl/submit",
            formData,
            handler: (response) => {
                if (response.error) {
                    setResponseMessage(
                        "Failed to submit form. Please try again."
                    );
                    setNotificationType("error");
                    setShowNotification(true);
                } else {
                    setResponseMessage("Form submitted successfully!");
                    setNotificationType("success");
                    setShowNotification(true);
                }
                console.log("Server response:", response);
            },
        });
    };

    console.log(responseMessage);
    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-10 h-full overflow-y-auto px-4 sm:px-10 md:px-20 lg:px-40 xl:px-80 py-10 max-w-screen-lg mx-auto"
            >
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
                <CustomDatePicker
                    setFormData={setFormData}
                    value={formData.date}
                />
                <button
                    className={`rounded-lg p-2 focus:outline-none focus:ring-2 text-white ${
                        isDisabled
                            ? "bg-inactivePurple"
                            : "bg-defaultPurple hover:bg-hoverPurple"
                    }`}
                    disabled={isDisabled}
                    type="submit"
                >
                    Send Application
                </button>
            </form>
            {showNotification && (
                <CustomNotification
                    message={responseMessage}
                    type={notificationType}
                    onClose={() => setShowNotification(false)}
                />
            )}
        </div>
    );
}

export default CustomForm;
