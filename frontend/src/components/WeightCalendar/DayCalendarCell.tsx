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
        lastWeightDiffText += `${(currentWeight - lastWeight).toFixed(2)}`;
        // lastWeightDiffText += ` (${lastWeight})`; // TODO: DEBUG
        return lastWeightDiffText;
    }

    const handleClickCell = (e: React.MouseEvent) => {
        navigate(ADD_WEIGHT_PATH, { state: { day: day }})
    }

    const lastWeightDiffElement = (currentWeight: number | undefined, lastWeight: number | undefined) => (
        currentWeight !== undefined && lastWeight !== undefined && (
            <div className={`text-xs text-center ${getClass(lastWeight, currentWeight)}`}>
                <span>{formatLastWeightDiffText(lastWeight, currentWeight)}</span><span className="hidden md:inline"> kg</span>
            </div> 
        )
    );


    return (
        <div
            key={dayStr}
            className={`flex flex-col border border-gray-300 cursor-pointer ${isToday && 'bg-blue-200'} ${!isDayPartOfSelectedMonth && !isHovering && 'bg-neutral-300'} ${isHovering && 'bg-accent'} pb-1`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={handleClickCell}
        >
            <div className="flex items-center gap-2">
                <span className="text-xs border-gray-300 border-b-1 border-r-1 p-1">{format(day, 'd')}</span>
                <span className="hidden md:block">{lastWeightDiffElement(weight, lastWeight)}</span>
            </div>
            <div className="grow flex items-center justify-center">
                {
                    weight !== undefined ? (
                        <div className={`text-sm font-light`}>
                            <span className="sm:text-base md:text-lg">{weight}</span><span className="hidden md:inline"> kg</span>
                        </div>
                    ) : (
                        isHovering && <span className="text-2xl">+</span>
                    )
                }
            </div>
            <div className="block md:hidden">
                {lastWeightDiffElement(weight, lastWeight)}
            </div>
        </div>
    )
}