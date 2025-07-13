import { format, isSameDay } from "date-fns";
import { DATE_FORMAT } from "../../constants/DateConstants";
import { useWeightsStore } from "../../hooks/useWeightsStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ADD_WEIGHT_PATH } from "../../constants/PathConstants";

interface Props {
    day: Date;
    isDayPartOfSelectedMonth: boolean;
}

export const DayCalendarCell = ({ day, isDayPartOfSelectedMonth }: Props) => {

    const dayStr = format(day, DATE_FORMAT);
    const isToday = isSameDay(day, new Date());

    const { store, loading } = useWeightsStore();
    const navigate = useNavigate();

    const [isHovering, setIsHovering] = useState(false);
    const [weight, setWeight] = useState(store.get(dayStr));
    const [lastWeight, setLastWeight] = useState(store.getWeightEntryPriorToDate(dayStr)?.weight);

    useEffect(() => {
        if (!loading) {
            const w = store.get(dayStr);
            const lw = store.getWeightEntryPriorToDate(dayStr)?.weight;
            w && setWeight(w);
            lw && setLastWeight(lw);
        }
    }, [loading]);

    const getClass = (lastWeight: number, currentWeight: number) => {
        if (lastWeight === currentWeight) {
            return 'text-grey-500';
        } else if (lastWeight > currentWeight) {
            return 'text-green-500';
        } else {
            return 'text-blue-500';
        }
    };

    const formatLastWeightDiffText = (lastWeight: number, currentWeight: number) => {
        let lastWeightDiffText = "";
        if (lastWeight < currentWeight) lastWeightDiffText += "+";
        lastWeightDiffText += `${(currentWeight - lastWeight).toFixed(3)}`;
        lastWeightDiffText += ` (${lastWeight})`; // TODO: DEBUG
        return lastWeightDiffText;
    }

    const handleClickCell = (e: React.MouseEvent) => {
        navigate(ADD_WEIGHT_PATH, { state: { day: day }})
    }


    return (
        <div
            key={dayStr}
            className={`flex flex-col border p-1 cursor-pointer ${isToday && 'bg-blue-200'} ${!isDayPartOfSelectedMonth && 'bg-neutral-300'}`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={handleClickCell}
        >
            <div className="flex justify-between">
                <span className="text-xs">{format(day, 'd')}</span>
            </div>
            <div className="grow">
                {
                    weight !== undefined ? (
                        <div className={`text-sm font-light`}>{weight} kg</div>
                    ) : (
                        isHovering && <span className="text-2xl">+</span>
                    )
                }
            </div>
            <div>
                {
                    weight !== undefined && lastWeight !== undefined && (
                        <div className={`text-xs text-center ${getClass(lastWeight, weight)}`}>
                            {formatLastWeightDiffText(lastWeight, weight)}
                        </div> 
                    )
                }

            </div>
        </div>
    )
}