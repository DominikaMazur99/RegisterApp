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
    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setFormData((prev) => ({
            ...prev,
            [field]: newValue,
        }));
    };

    return (
        <div className="flex flex-col gap-2">
            <p className="font-sans font-normal text-base leading-5 text-textColor">
                {label}
            </p>
            <input
                value={value || ""}
                onChange={handleChangeInput}
                className="border border-inactivePurple rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-inactivePurple bg-[#FFFFFF]"
            />
        </div>
    );
};

export default CustomInput;
