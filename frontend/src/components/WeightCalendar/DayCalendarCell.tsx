import { format, isSameDay } from "date-fns";
import { DATE_FORMAT } from "../../constants/DateConstants";
import { useWeightsStore } from "../../hooks/useWeightsStore";

interface Props {
    day: Date;
    isDayPartOfSelectedMonth: boolean;
}

export const DayCalendarCell = ({ day, isDayPartOfSelectedMonth }: Props) => {

    const { store } = useWeightsStore();

    const dayStr = format(day, DATE_FORMAT);
    const isToday = isSameDay(day, new Date());
    const weight = store.get(dayStr);
    const lastWeight = store.getWeightEntryPriorToDate(dayStr)?.weight;

    const getClass = (lastWeight: number, currentWeight: number) => {
        if (lastWeight === currentWeight) {
            return 'text-grey-500';
        } else if (lastWeight > currentWeight) {
            return 'text-green-500';
        } else {
            return 'text-blue-500';
        }
    };

    return (
        <div key={dayStr} className={`border p-1 ${isToday && 'bg-blue-200'} ${!isDayPartOfSelectedMonth && 'bg-neutral-300'}`}>
            <div className="text-xs text-left">{format(day, 'd')}</div>
            {weight !== undefined && (<>
                <div className={`text-sm font-light`}>{weight} kg</div>
                {lastWeight && 
                    <div className={`text-xs text-right ${lastWeight && getClass(lastWeight, weight)}`}>{lastWeight < weight && '+'}{lastWeight && (weight - lastWeight).toFixed(3)} ({lastWeight})</div> 
                }
            </>)}
        </div>
    )
}