import { addWeeks, eachDayOfInterval, endOfISOWeek, format, getISOWeek, getYear, isSameMonth, setISOWeek, setYear, startOfISOWeek } from "date-fns";
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
        const date = setISOWeek(setYear(new Date(year, 0, 1), year), week);
        const monday = startOfISOWeek(date);
        const sunday = endOfISOWeek(date);
        return { monday, sunday };
    }

    const getPreviousWeek = (year: number, week: number) => {
        const date = setISOWeek(setYear(new Date(year, 0, 1), year), week);
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

        {
            daysOfWeeks.map(day => 
                <DayCalendarCell
                    key={format(day, DATE_FORMAT)}
                    day={day}
                    isDayPartOfSelectedMonth={isSameMonth(day, currentMonth)}
                />
            )
        }

        <div className="sm:ml-1 text-center h-20 border border-gray-400 flex flex-col pb-1">
            <div className="flex justify-between">
                <span className="p-1 text-xs border-b-1 border-r-1 border-gray-400">S-{format(firstOfWeek, 'I')}</span>
            </div>
            <div className="grow text-xs font-light flex items-center justify-center">
                {weekAvg && (<div>
                    <span className="sm:text-base md:text-lg">{weekAvg.toFixed(3)}</span><span className="hidden md:inline"> kg</span>
                </div>)}
            </div>
            <div>
                {weekAvg && lastWeekAvg && 
                    <div className={`text-xs text-center md:text-right ${lastWeekAvg && getClass(lastWeekAvg, weekAvg)} md:pr-1`}>
                        {lastWeekAvg < weekAvg && '+'}{lastWeekAvg && (weekAvg - lastWeekAvg).toFixed(3)}
                    </div> 
                }
            </div>
        </div>
    </>)
}