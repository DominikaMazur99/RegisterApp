interface ICustomInput {
    label: string;
}

const CustomInput: React.FC<ICustomInput> = ({ label }) => {
    return (
        <div className="flex flex-col gap-2">
            <p className="font-sans font-normal text-base leading-5 text-textColor">
                {label}
            </p>
            <input className="border border-inactivePurple rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-inactivePurple bg-[#FFFFFF]" />
        </div>
    );
};

export default CustomInput;
