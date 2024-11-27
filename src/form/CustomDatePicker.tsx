import React, { useEffect, useState } from "react";

interface Holiday {
    date: string;
    name: string;
    type: string;
}

const CustomDatePicker: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [holidays, setHolidays] = useState<Holiday[]>([]); // Initialize as an empty array
    const [info, setInfo] = useState<string | null>(null);

    const daysInMonth = (month: number, year: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getStartDayOfMonth = (month: number, year: number) => {
        return new Date(year, month, 1).getDay();
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

    const fetchHolidays = async () => {
        try {
            const response = await fetch(
                "https://api.api-ninjas.com/v1/holidays?country=PL&year=2024",
                {
                    headers: {
                        "X-Api-Key": "jLRG8GyCMYw2BJkIWF7S4w==WuRlBupy7vgLLXvV",
                    },
                }
            );
            const data: Holiday[] = await response.json(); // Ensure it's an array
            console.log(data);
            setHolidays(data || []); // Safely set holidays or an empty array
        } catch (error) {
            console.error("Error fetching holidays:", error);
            setHolidays([]); // Fallback to an empty array if the fetch fails
        }
    };

    useEffect(() => {
        fetchHolidays();
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
                                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                    : isSelected
                                    ? "bg-purple-500 text-white"
                                    : isToday
                                    ? "bg-purple-100 text-purple-700"
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
        <div className="flex flex-col gap-4 max-w-sm mx-auto">
            <h1 className="text-xl font-bold text-navy">Your workout</h1>
            <label className="text-sm text-gray-700 font-medium">Date</label>
            <div className="p-4 border border-purple-300 rounded-lg shadow-md bg-white">
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-4">
                    <button
                        onClick={handlePrevMonth}
                        className="text-purple-500 font-bold"
                    >
                        &lt;
                    </button>
                    <h2 className="text-sm font-semibold text-gray-800">
                        {currentMonth.toLocaleString("default", {
                            month: "long",
                        })}{" "}
                        {currentMonth.getFullYear()}
                    </h2>
                    <button
                        onClick={handleNextMonth}
                        className="text-purple-500 font-bold"
                    >
                        &gt;
                    </button>
                </div>
                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-600 mb-2">
                    {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
                        <div key={day} className="font-semibold">
                            {day}
                        </div>
                    ))}
                </div>
                {/* Calendar Body */}
                <div>{renderCalendar()}</div>
            </div>
            {info && (
                <p className="text-sm text-gray-700">
                    <span className="font-semibold">{info}</span>
                </p>
            )}
        </div>
    );
};

export default CustomDatePicker;
