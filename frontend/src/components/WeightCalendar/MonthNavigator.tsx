import { addMonths, subMonths } from "date-fns";

interface Props {
    selectedMonth: Date;
    setSelectedMonth: (date: Date) => void;
}

export const MonthNavigator = ({ selectedMonth, setSelectedMonth }: Props) => {

    const today = new Date();

    return (
        <div className="flex justify-center gap-x-2 items-center">
            <button
                onClick={() => setSelectedMonth(subMonths(selectedMonth, 1))}
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
            >
                &#x3c;
            </button>
            <button
                onClick={() => setSelectedMonth(today)}
                className="px-3 py-1 rounded bg-blue-100 hover:bg-blue-200"
            >
                Hoy
            </button>
            <button
                onClick={() => setSelectedMonth(addMonths(selectedMonth, 1))}
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
            >
                &#x3e;
            </button>
        </div>
    )
}