import { addDays, format, isSameDay, isSameMonth } from "date-fns";
import { DATE_FORMAT } from "../../constants/DateConstants";

interface Props {
    currentMonth: Date;
    firstOfWeek: Date;
    lastOfWeek: Date;
    weekWeights: Map<string, number>;
    weekAvg: number | undefined; // Average of the current week (if exist)
    lastWeekAvg: number | undefined; // Average of the last week (if exist)
    lastWeight: number | undefined; // Last weight previous of this week (if exist)
}

export const WeekCalendarRow = ({ currentMonth, firstOfWeek, lastOfWeek, weekWeights, weekAvg, lastWeekAvg, lastWeight: lastWeightPreviousThanThisWeek }: Props) => {

    const getClass = (lastWeight: number, currentWeight: number) => {
        if (lastWeight === currentWeight) {
            return 'text-grey-500';
        } else if (lastWeight > currentWeight) {
            return 'text-green-500';
        } else {
            return 'text-blue-500';
        }
    };
    
    const days = [];
    let day = firstOfWeek;

    days.push(
        <div key={day.toString()} className="flex p-2 items-center h-16">
            <span className="badge badge-sm block">S-{format(day, 'I')}</span>
        </div>
    );

    let lastWeight = lastWeightPreviousThanThisWeek;
    while (day <= lastOfWeek) {

        const dayStr = format(day, 'yyyy-MM-dd');
        const weight = weekWeights.get(dayStr);
        const isToday = isSameDay(day, new Date());
        const isDayOfCurrentMonth = isSameMonth(day, currentMonth);

        const dayElement = (
            <div key={format(day, DATE_FORMAT)} className={`border p-1 ${isToday && 'bg-blue-200'} ${!isDayOfCurrentMonth && 'bg-neutral-300'}`}>
                <div className="text-xs text-left">{format(day, 'd')}</div>
                {weight !== undefined && (<>
                    <div className={`text-sm font-light`}>{weight} kg</div>
                    {lastWeight && 
                        <div className={`text-xs text-right ${lastWeight && getClass(lastWeight, weight)}`}>{lastWeight < weight && '+'}{lastWeight && (weight - lastWeight).toFixed(3)}</div> 
                    }
                </>)}
            </div>
        )

        days.push(dayElement);

        day = addDays(day, 1);
        if (weight !== undefined) lastWeight = weight;
    }

    days.push(
        <div className={`p-2 text-center`}>

            {weekAvg !== undefined && (<>
                <div className={`text-sm font-light`}>{weekAvg.toFixed(3)} kg</div>
                {lastWeekAvg && 
                    <div className={`text-xs text-right ${lastWeekAvg && getClass(lastWeekAvg, weekAvg)}`}>{lastWeekAvg < weekAvg && '+'}{lastWeekAvg && (weekAvg - lastWeekAvg).toFixed(3)}</div> 
                }
            </>)}
            
        </div>
    )

    return (<>
        {days}
    </>)
}