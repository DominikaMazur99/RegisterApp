import React, { useEffect, useState } from "react";
import { reusableFetchFunction } from "../api/api";
import Arrow from "../icons/ArrowIcon";
import {
    availableHours,
    daysInMonth,
    daysOfTheWeek,
    getStartDayOfMonth,
} from "../helpers/helpers";
import { Holiday, ICustomDatePicker } from "../interfaces/interfaces";

const CustomDatePicker: React.FC<ICustomDatePicker> = ({
    setFormData,
    value,
}) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [holidays, setHolidays] = useState<Holiday[]>([]);
    const [info, setInfo] = useState<string | null>(null);
    const [selectedHour, setSelectedHour] = useState<string | null>(null);

    const handlePrevMonth = () => {
        setCurrentMonth(
            new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
        );
    };

    const handleNextMonth = () => {
        setCurrentMonth(
            new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
        );
    };

    const handleDateClick = (day: number) => {
        const clickedDate = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            day
        );
        const clickedHoliday = holidays?.find(
            (holiday) =>
                new Date(holiday.date).toDateString() ===
                clickedDate.toDateString()
        );

        if (clickedHoliday?.type === "OBSERVANCE") {
            setInfo(`${clickedHoliday.name}: ${clickedHoliday.type}`);
        } else {
            setInfo(null);
        }

        if (
            clickedHoliday?.type !== "NATIONAL_HOLIDAY" &&
            clickedDate.getDay() !== 0
        ) {
            setFormData((prev) => ({
                ...prev,
                date: clickedDate,
            }));
        }
    };

    const isDisabled = (day: number) => {
        const date = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            day
        );
        const holiday = holidays?.find(
            (holiday) =>
                new Date(holiday.date).toDateString() === date.toDateString()
        );

        return date.getDay() === 0 || holiday?.type === "NATIONAL_HOLIDAY";
    };

    const fetchHolidays = async (
        setHolidays: (holidays: Holiday[]) => void
    ) => {
        await reusableFetchFunction<Holiday[]>({
            url: "https://api.api-ninjas.com/v1/holidays?country=PL&year=2024",
            handler: setHolidays,
        });
    };

    useEffect(() => {
        fetchHolidays(setHolidays);
    }, []);

    const renderCalendar = () => {
        const daysInCurrentMonth = daysInMonth(
            currentMonth.getMonth(),
            currentMonth.getFullYear()
        );
        const startDay = getStartDayOfMonth(
            currentMonth.getMonth(),
            currentMonth.getFullYear()
        );
        const weeks: JSX.Element[] = [];
        let currentDay = 1;

        for (let i = 0; i < 6; i++) {
            const days: JSX.Element[] = [];
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < startDay) {
                    days.push(
                        <div
                            key={`empty-${i}-${j}`}
                            className="flex items-center justify-center w-10 h-10"
                        ></div>
                    );
                } else if (currentDay > daysInCurrentMonth) {
                    days.push(
                        <div
                            key={`empty-${i}-${j}`}
                            className="flex items-center justify-center w-10 h-10"
                        ></div>
                    );
                } else {
                    const dayValue = currentDay;
                    const disabled = isDisabled(dayValue);
                    const isSelected =
                        value &&
                        value.getDate() === dayValue &&
                        value.getMonth() === currentMonth.getMonth() &&
                        value.getFullYear() === currentMonth.getFullYear();

                    const holiday = holidays?.find(
                        (holiday) =>
                            new Date(holiday.date).toDateString() ===
                            new Date(
                                currentMonth.getFullYear(),
                                currentMonth.getMonth(),
                                dayValue
                            ).toDateString()
                    );

                    days.push(
                        <div
                            key={`day-${dayValue}`}
                            onClick={() => handleDateClick(dayValue)}
                            className={`flex items-center justify-center cursor-pointer w-10 h-10 ${
                                disabled
                                    ? "text-disabledTextColor cursor-not-allowed"
                                    : isSelected
                                    ? "bg-defaultPurple text-white rounded-full"
                                    : "hover:bg-inactivePurple hover:rounded-full transition-all"
                            }`}
                        >
                            {dayValue}
                            {holiday?.type === "OBSERVANCE" && (
                                <span className="text-xs text-purple-500">
                                    *
                                </span>
                            )}
                        </div>
                    );
                    currentDay++;
                }
            }
            weeks.push(
                <div key={`week-${i}`} className="grid grid-cols-7 gap-1">
                    {days}
                </div>
            );
        }
        return weeks;
    };

    const handleTimeClick = (hour: string) => {
        setFormData((prev) => ({
            ...prev,
            hour: hour,
        }));
        setSelectedHour(hour);
    };

    console.log(info);

    return (
        <div className="flex flex-col gap-4">
            <p className="font-sans font-normal leading-5 text-textColor text-xl">
                Your workout
            </p>
            <div className="grid grid-cols-1 md:grid-cols-[4fr_1fr] gap-4 w-full">
                <div className="col-span-1 md:col-span-1 w-full">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-700 font-medium">
                            Date
                        </label>
                        <div className="p-4 border border-purple-300 rounded-lg shadow-md bg-white w-full max-w-full h-auto">
                            <div className="flex items-center justify-between mb-4">
                                <button
                                    onClick={handlePrevMonth}
                                    className="text-purple-500 font-bold"
                                >
                                    <Arrow direction="right" />
                                </button>
                                <h2 className="text-sm font-semibold text-gray-800">
                                    {currentMonth.toLocaleString("en-US", {
                                        month: "long",
                                    })}{" "}
                                    {currentMonth.getFullYear()}
                                </h2>
                                <button
                                    onClick={handleNextMonth}
                                    className="text-purple-500 font-bold"
                                >
                                    <Arrow direction="left" />
                                </button>
                            </div>
                            <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-600 mb-2">
                                {daysOfTheWeek.map((day, index) => (
                                    <div
                                        key={day}
                                        className={`w-10 h-10 flex items-center justify-center font-semibold ${
                                            index === 6
                                                ? "text-disabledTextColor"
                                                : ""
                                        }`}
                                    >
                                        {day}
                                    </div>
                                ))}
                            </div>

                            <div>{renderCalendar()}</div>
                        </div>
                        {info && (
                            <p className="text-sm text-gray-700">
                                <span className="font-semibold">{info}</span>
                            </p>
                        )}
                    </div>
                </div>

                {value && (
                    <div className="col-span-1 md:col-span-1 w-full md:flex md:flex-col ">
                        <label className="text-sm text-gray-700 font-medium md:mb-2 md:items-start">
                            Time
                        </label>
                        <div className="grid grid-cols-3 md:grid-cols-1 gap-2 md:items-end">
                            {availableHours.map((hour, index) => (
                                <div
                                    key={index}
                                    className={`p-2 border border-inactivePurple rounded-lg shadow-md text-center hover:cursor-pointer transition-all ${
                                        selectedHour === hour
                                            ? "border-defaultPurple bg-white"
                                            : "bg-white hover:border-defaultPurple"
                                    }`}
                                    onClick={() => handleTimeClick(hour)}
                                >
                                    {hour}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomDatePicker;
