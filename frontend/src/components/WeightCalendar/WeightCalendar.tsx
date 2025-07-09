import { useMemo, useState } from "react";
import { addDays, addMonths, endOfMonth, endOfWeek, format, startOfMonth, startOfWeek, subMonths } from "date-fns";
import { Weight } from "../../types/Weight";
import { daysInWeek } from "date-fns/constants";
import { WeekCalendarRow } from "./WeekCalendarRow";
import { DATE_FORMAT } from "../../constants/DateConstants";

interface Props {
    weights: Weight[];
}

export const WeightCalendar = ({ weights }: Props) => {

    const [currentDate, setCurrentDate] = useState(new Date());

    const orderedWeightsByDate = (weights: Weight[]) => {
        const map = new Map<string, number>();
        weights
            .sort((a, b) => a.date.localeCompare(b.date))
            .forEach(e => map.set(e.date, e.weight));
        return map;
    };

    
    const weightsMap = useMemo(() => orderedWeightsByDate(weights), [weights]);

    const firstOfMonth = startOfMonth(currentDate);
    const lastOfMonth = endOfMonth(firstOfMonth);
    const firstOfCalendar = startOfWeek(firstOfMonth, { weekStartsOn: 1 });
    const lastOfCalendar = endOfWeek(lastOfMonth, { weekStartsOn: 1 });

    /**
     * Return the week average of the last week of the previous month
     * @returns number if exists, undefined otherwise
     */
    const getWeightAvgOfLastWeekOfPreviousMonth = () => {
        let startDateOfPreviousWeek = addDays(firstOfCalendar, -daysInWeek);
        const weightsOfPreviousWeek = [];
        for (let i = 0; i < daysInWeek; i++) {
            const dayStr = format(startDateOfPreviousWeek, DATE_FORMAT);
            const weight = weightsMap.get(dayStr);
    
            if (weight) {
                weightsOfPreviousWeek.push(weight);
            }
            startDateOfPreviousWeek = addDays(startDateOfPreviousWeek, 1);
        }
        return weightsOfPreviousWeek.length > 0 ? weightsOfPreviousWeek.reduce((acc, e) => acc + e, 0) / weightsOfPreviousWeek.length : undefined;
    }

    const existsOldestWeightPreviousThan = (date: Date): boolean => {
        const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD
        const keys = Array.from(weightsMap.keys()); // Fechas ordenadas

        let left = 0;
        let right = keys.length - 1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            const midDateStr = keys[mid];

            if (midDateStr < dateStr) {
                return true;
            } else {
                right = mid - 1;
            }
        }

        return false;
    };

    const getOldestWeightPreviousThan = (date: Date) : number | undefined => {
        if (existsOldestWeightPreviousThan(date)) {
            const previousDay = addDays(date, -1);
            const lastWeight = weightsMap.get(format(previousDay, DATE_FORMAT));
            if (lastWeight !== undefined) {
                return lastWeight;
            } else {
                return getOldestWeightPreviousThan(addDays(date, -1));
            }
        }
        return undefined;
    };
    
    let day = firstOfCalendar;
    let lastWeightPreviousThisWeek = getOldestWeightPreviousThan(day);
    let lastWeight = lastWeightPreviousThisWeek;
    let lastWeekAvg = getWeightAvgOfLastWeekOfPreviousMonth();

    const weekRowComponents = [];

    while (day <= lastOfCalendar) {

        const weightsOfWeek: Map<string, number> = new Map();
        const weekEntries: number[] = [];

        const firstOfWeek = startOfWeek(day, { weekStartsOn: 1});
        const lastOfWeek = endOfWeek(day, { weekStartsOn: 1 });
        
        for (let i = 0; i < daysInWeek; i++) {

            const dayStr = format(day, DATE_FORMAT);
            const weight = weightsMap.get(dayStr);

            if (weight !== undefined) {
                weightsOfWeek.set(format(day, DATE_FORMAT), weight);
                weekEntries.push(weight)
                lastWeight = weight;
            }

            day = addDays(day, 1);
        }

        const weekAvg =
            weekEntries.length > 0
                ? (weekEntries.reduce((sum, w) => sum + w, 0) / weekEntries.length)
                : undefined;

        weekRowComponents.push(
            <WeekCalendarRow
                key={firstOfWeek.toUTCString()}
                currentMonth={currentDate}
                firstOfWeek={firstOfWeek}
                lastOfWeek={lastOfWeek}
                weekWeights={weightsOfWeek}
                weekAvg={weekAvg}
                lastWeekAvg={lastWeekAvg}
                lastWeightPreviousThisWeek={lastWeightPreviousThisWeek}
            />
        )

        lastWeightPreviousThisWeek = lastWeight;
        lastWeekAvg = weekAvg;

    }


    return (<>


        <div className="space-y-2 max-w-4xl min-w-3xl">
            <div className="flex justify-evenly mb-5">

                <h2 className="text-xl font-semibold mb-2">
                    {format(currentDate, 'MMMM yyyy')}
                </h2>
                <div className="flex justify-center gap-x-2 items-center">
                    <button
                        onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                    >
                        ← Mes anterior
                    </button>
                    <button
                        onClick={() => setCurrentDate(new Date())}
                        className="px-3 py-1 rounded bg-blue-100 hover:bg-blue-200"
                    >
                        Mes actual
                    </button>
                    <button
                        onClick={() => setCurrentDate(addMonths(currentDate, 1))}
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
                {weekRowComponents}
            </div>
        </div>


    </>);

}