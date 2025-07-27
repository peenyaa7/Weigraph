import { useMemo, useState } from "react";
import { eachWeekOfInterval, endOfMonth, format, getISOWeek, getISOWeekYear, getYear, startOfMonth } from "date-fns";
import { WeekCalendarRow } from "./WeekCalendarRow";
import { useWeightsStore } from "../../hooks/useWeightsStore";
import { useNavigate } from "react-router-dom";
import { ADD_WEIGHT_PATH } from "../../constants/PathConstants";
import { MonthNavigator } from "./MonthNavigator";

export const WeightCalendar = () => {

    const { loading } = useWeightsStore();
    const navigate = useNavigate();

    const [selectedMonth, setSelectedMonth] = useState(new Date());

    const firstOfMonth = useMemo(() => startOfMonth(selectedMonth), [selectedMonth]);
    const lastOfMonth = useMemo(() => endOfMonth(firstOfMonth), [selectedMonth]);
    const weeksOfSelectedMonth = useMemo(() => eachWeekOfInterval({ start: firstOfMonth, end: lastOfMonth }, { weekStartsOn: 1 }), [selectedMonth]);

    const COLUMNS = ['L', 'M', 'X', 'J', 'V', 'S', 'D', 'Media']

    return (

            loading ? <div className="skeleton h-96 w-3xl"></div> : (

                <div className="space-y-2 max-w-4xl">


                    {/** Grid logic:
                     * 
                     * Desktop grid result -> 3 columns, 1 row -> A B C
                     * 
                     * Mobile grid result -> 2 columns, 2 rows -> A C
                     *                                             B
                     * 
                     */}
                    <div className="grid grid-cols-2 grid-rows-2 md:grid-cols-3 md:grid-rows-1 gap-4">
                        <div className="col-span-1 row-span-1">
                            <h2 className="text-xl font-semibold mb-2">
                                {format(selectedMonth, 'MMMM yyyy')}
                            </h2>
                        </div>
                        <div className="col-span-1 col-start-1 col-end-3 md:col-start-2 row-span-1 row-start-2 md:row-start-1">
                            <MonthNavigator selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
                        </div>
                        <div className="col-span-1 row-span-1">
                            <div className="flex justify-end">
                                <button
                                    onClick={() => navigate(ADD_WEIGHT_PATH)}
                                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                                >
                                    &#x2b; Nuevo peso
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-8 font-semibold text-center mb-1">
                        {COLUMNS.map(c => <div key={c}>{c}</div> )}
                        {
                            weeksOfSelectedMonth.map(week => {
                                const weekNumber = getISOWeek(week);
                                const yearNumber = getISOWeekYear(week);
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