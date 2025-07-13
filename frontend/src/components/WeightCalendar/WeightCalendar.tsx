import { useState } from "react";
import { addMonths, eachWeekOfInterval, endOfMonth, format, getISOWeek, getYear, startOfMonth, subMonths } from "date-fns";
import { WeekCalendarRow } from "./WeekCalendarRow";
import { useWeightsStore } from "../../hooks/useWeightsStore";

export const WeightCalendar = () => {

    const { loading } = useWeightsStore();

    const [selectedMonth, setSelectedMonth] = useState(new Date());

    const firstOfMonth = startOfMonth(selectedMonth);
    const lastOfMonth = endOfMonth(firstOfMonth);
    
    const weeksOfSelectedMonth = eachWeekOfInterval({ start: firstOfMonth, end: lastOfMonth }, { weekStartsOn: 1 });

    return (

            loading ? <div className="skeleton h-96 w-3xl"></div> : (

                <div className="space-y-2 max-w-4xl min-w-3xl">
                    <div className="flex justify-evenly mb-5">

                        <h2 className="text-xl font-semibold mb-2">
                            {format(selectedMonth, 'MMMM yyyy')}
                        </h2>
                        <div className="flex justify-center gap-x-2 items-center">
                            <button
                                onClick={() => setSelectedMonth(subMonths(selectedMonth, 1))}
                                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                            >
                                ← Mes anterior
                            </button>
                            <button
                                onClick={() => setSelectedMonth(new Date())}
                                className="px-3 py-1 rounded bg-blue-100 hover:bg-blue-200"
                            >
                                Mes actual
                            </button>
                            <button
                                onClick={() => setSelectedMonth(addMonths(selectedMonth, 1))}
                                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                            >
                                Mes siguiente →
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-9 font-semibold text-center mb-1">
                        {['', 'L', 'M', 'X', 'J', 'V', 'S', 'D', 'Media'].map((d) => (
                            <div key={d}>{d}</div>
                        ))}
                        {
                            weeksOfSelectedMonth.map(week => {
                                const weekNumber = getISOWeek(week);
                                const yearNumber = getYear(week);
                                return (
                                    <WeekCalendarRow
                                        key={`${yearNumber}-${weekNumber}`}
                                        weekNumber={weekNumber}
                                        yearNumber={yearNumber}
                                        currentMonth={selectedMonth}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            )


    );

}