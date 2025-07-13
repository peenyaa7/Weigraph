import { addWeeks, eachDayOfInterval, endOfWeek, format, getISOWeek, getYear, isSameMonth, setWeek, setYear, startOfWeek } from "date-fns";
import { DATE_FORMAT } from "../../constants/DateConstants";
import { useWeightsStore } from "../../hooks/useWeightsStore";
import { DayCalendarCell } from "./DayCalendarCell";

interface Props {
    currentMonth: Date;
    yearNumber: number; // yyyy
    weekNumber: number; // 0-52
}

export const WeekCalendarRow = ({ currentMonth, yearNumber, weekNumber }: Props) => {
    
    const { store } = useWeightsStore();

    const getWeekRange = (year: number, week: number) => {
        const date = setWeek(setYear(new Date(year, 0, 1), year), week);
        const monday = startOfWeek(date, { weekStartsOn: 1 });
        const sunday = endOfWeek(date, { weekStartsOn: 1 });
        return { monday, sunday };
    }

    const getPreviousWeek = (year: number, week: number) => {
        const date = setWeek(setYear(new Date(year, 0, 1), year), week);
        const dateOfPreviousWeek = addWeeks(date, -1);
        const yearOfPreviousWeek = getYear(dateOfPreviousWeek);
        const weekNumberOfPreviousWeek = getISOWeek(dateOfPreviousWeek)
        return { yearOfPreviousWeek, weekNumberOfPreviousWeek };
    }

    const { monday: firstOfWeek, sunday: lastOfWeek } = getWeekRange(yearNumber, weekNumber);
    const weekAvg = store.getWeekAverage(yearNumber, weekNumber);
    
    const { yearOfPreviousWeek, weekNumberOfPreviousWeek } = getPreviousWeek(yearNumber, weekNumber);
    const lastWeekAvg = store.getWeekAverage(yearOfPreviousWeek, weekNumberOfPreviousWeek);

    const getClass = (lastWeight: number, currentWeight: number) => {
        if (lastWeight === currentWeight) {
            return 'text-grey-500';
        } else if (lastWeight > currentWeight) {
            return 'text-green-500';
        } else {
            return 'text-blue-500';
        }
    };
    
    const daysOfWeeks = eachDayOfInterval({ start: firstOfWeek, end: lastOfWeek });

    return (<>

        <div key={firstOfWeek.toString()} className="flex p-2 items-center h-16">
            <span className="badge badge-sm block">S-{format(firstOfWeek, 'I')}</span>
        </div>

        {
            daysOfWeeks.map(day => 
                <DayCalendarCell
                    key={format(day, DATE_FORMAT)}
                    day={day}
                    isDayPartOfSelectedMonth={isSameMonth(day, currentMonth)}
                />
            )
        }

        <div className={`p-2 text-center`}>
            {weekAvg !== undefined && (<>
                <div className={`text-sm font-light`}>{weekAvg.toFixed(3)} kg</div>
                {lastWeekAvg && 
                    <div className={`text-xs text-right ${lastWeekAvg && getClass(lastWeekAvg, weekAvg)}`}>{lastWeekAvg < weekAvg && '+'}{lastWeekAvg && (weekAvg - lastWeekAvg).toFixed(3)}</div> 
                }
            </>)}
        </div>
    </>)
}