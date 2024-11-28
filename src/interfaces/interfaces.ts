export interface IFormData {
    firstName: string;
    secondName: string;
    emailAdress: string;
    age: number;
    file: any;
    date: Date | null;
    hour: string | null;
}

export interface ICustomInput {
    label: string;
    field: string;
    value: string;
    errorMessage: string;
    setErrorMessage: (error: string) => void;
    setFormData: (update: (prev: any) => any) => void;
}

export interface Holiday {
    country: string;
    iso: string;
    year: number;
    date: string;
    day: string;
    name: string;
    type: string;
}

export interface DragAndDropProps {
    setFormData: (update: (prev: any) => any) => void;
}

export interface ICustomDatePicker extends DragAndDropProps {
    value: Date | null;
}

export interface SliderProps extends DragAndDropProps {
    min: number;
    max: number;
    step: number;
    field: string;
    value: number;
}
