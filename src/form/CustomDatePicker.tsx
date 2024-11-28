import React, { useEffect, useState } from "react";
import { reusableFetchFunction } from "../api/api";
import arrowRight from "../icons/arrowRightIcon.svg";
import Arrow from "../icons/ArrowIcon";

interface Holiday {
    country: string;
    iso: string;
    year: number;
    date: string;
    day: string;
    name: string;
    type: string;
}

const CustomDatePicker: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [holidays, setHolidays] = useState<Holiday[]>([]);
    const [info, setInfo] = useState<string | null>(null);

    const daysInMonth = (month: number, year: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getStartDayOfMonth = (month: number, year: number) => {
        const day = new Date(year, month, 1).getDay();
        return (day + 6) % 7; // Przesuwa niedzielę (0) na koniec
    };

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
            clickedDate.getDay() !== 0 // Exclude Sundays
        ) {
            setSelectedDate(clickedDate);
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
        let day = 1;

        for (let i = 0; i < 6; i++) {
            const days: JSX.Element[] = [];
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < startDay) {
                    days.push(<div key={j} className="flex-1 h-10"></div>);
                } else if (day > daysInCurrentMonth) {
                    days.push(<div key={j} className="flex-1 h-10"></div>);
                } else {
                    const disabled = isDisabled(day);
                    const isSelected =
                        selectedDate &&
                        selectedDate.getDate() === day &&
                        selectedDate.getMonth() === currentMonth.getMonth() &&
                        selectedDate.getFullYear() ===
                            currentMonth.getFullYear();

                    const holiday = holidays?.find(
                        (holiday) =>
                            new Date(holiday.date).toDateString() ===
                            new Date(
                                currentMonth.getFullYear(),
                                currentMonth.getMonth(),
                                day
                            ).toDateString()
                    );

                    const isToday =
                        new Date().toDateString() ===
                        new Date(
                            currentMonth.getFullYear(),
                            currentMonth.getMonth(),
                            day
                        ).toDateString();

                    days.push(
                        <div
                            key={j}
                            onClick={
                                !disabled
                                    ? () => handleDateClick(day)
                                    : undefined
                            }
                            className={`flex-1 h-10 flex items-center justify-center cursor-pointer rounded-lg ${
                                disabled
                                    ? "text-disabledTextColor cursor-not-allowed"
                                    : isSelected
                                    ? "bg-defaultPurple text-white"
                                    : isToday
                                    ? "text-defaultPurple"
                                    : "hover:bg-purple-50"
                            }`}
                        >
                            {day}
                            {holiday?.type === "OBSERVANCE" && (
                                <span className="text-xs text-purple-500">
                                    *
                                </span>
                            )}
                        </div>
                    );
                    day++;
                }
            }
            weeks.push(
                <div key={i} className="flex">
                    {days}
                </div>
            );
        }
        return weeks;
    };

    return (
        <div className="flex flex-col gap-4">
            <p className="font-sans font-normal leading-5 text-textColor text-xl">
                Personal Info
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Sekcja Date */}
                <div className="col-span-3">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-700 font-medium">
                            Date
                        </label>
                        <div className="p-4 border border-purple-300 rounded-lg shadow-md bg-white w-full max-w-sm h-auto max-h-[292px]">
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
                                {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map(
                                    (day, index) => (
                                        <div
                                            key={day}
                                            className={`font-semibold ${
                                                index === 6
                                                    ? "text-disabledTextColor"
                                                    : ""
                                            }`}
                                        >
                                            {day}
                                        </div>
                                    )
                                )}
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

                <div className="col-span-1 flex flex-col">
                    <label className="text-sm text-gray-700 font-medium mb-2">
                        Time
                    </label>
                    <div className="grid grid-cols-1 gap-4">
                        {["12:00", "14:30", "16:00", "18:00"].map(
                            (hour, index) => (
                                <div
                                    key={index}
                                    className="p-2 border border-purple-300 rounded-lg shadow-md bg-white text-center"
                                >
                                    {hour}
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomDatePicker;
