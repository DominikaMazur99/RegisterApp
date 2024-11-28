const emptyFieldMessage = "This field is required.";

const availableHours = ["12:00", "14:00", "16:00", "18:00"];

const daysOfTheWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

const daysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
};

const getStartDayOfMonth = (month: number, year: number) => {
    const day = new Date(year, month, 1).getDay();
    return (day + 6) % 7;
};

export {
    emptyFieldMessage,
    availableHours,
    daysOfTheWeek,
    validateEmail,
    daysInMonth,
    getStartDayOfMonth,
};
