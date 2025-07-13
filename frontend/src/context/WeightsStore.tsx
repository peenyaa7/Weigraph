import { getISOWeek, getYear, isAfter, parse } from "date-fns";
import { Weight } from "../types/Weight";
import { DATE_FORMAT } from "../constants/DateConstants";

export class WeightsStore {
    private weights: Map<string, number>; // date => weight
    private sortedDates: string[] = [];

    constructor(entries: Weight[] = []) {
        this.weights = new Map();
        entries.forEach(e => this.weights.set(e.date, e.weight));
        this.updateSortedDates();
    }

    private updateSortedDates() {
        this.sortedDates = Array.from(this.weights.keys()).sort();
    }

    /**
     * Load all weights to the store from zero
     * @param weights Weights to load
     */
    loadWeights(weights: Weight[]) {
        weights.map(w => this.weights.set(w.date, w.weight));
        this.updateSortedDates();
    }

    /**
     * Get all weights ordered (date ascendant)
     * @returns All weights ordered
     */
    getAll(): Weight[] {
        return this.sortedDates.map(date => ({
            date,
            weight: this.weights.get(date)!,
        }));
    }

    /**
     * Get weight from specified date
     * @param date Date of the weight in {@link DATE_FORMAT} ('yyyy-MM-dd')
     * @returns Weight of specified date if exists, undefined otherwise
     */
    get(date: string): number | undefined {
        return this.weights.get(date);
    }

    /**
     * Create new weight or modify the existing one of the specified date.
     * @param entry Weight to add/modify
     */
    addOrUpdate(entry: Weight): void {
        this.weights.set(entry.date, entry.weight);
        this.updateSortedDates();
    }

    /**
     * Remove weight of specified date.
     * @param date Date of the weight to be deleted.
     */
    remove(date: string): void {
        this.weights.delete(date);
        this.updateSortedDates();
    }

    /**
     * Get the last weight prior to specified date
     * @param date Date
     * @returns Last weight prior to specified date if exists, undefined otherwise
     */
    getWeightEntryPriorToDate(date: string): Weight | undefined {

        if (this.sortedDates.length == 0)
            return undefined;

        // Find first index which date is after than specified date
        const index = this.sortedDates.findIndex(d => d >= date);
        if (index > 0) {
            const prevDate = this.sortedDates[index - 1];
            return { date: prevDate, weight: this.weights.get(prevDate)! };
        }

        // Check if specified date is after than last date (e.g: future dates)
        const lastDate = this.sortedDates[this.sortedDates.length - 1];
        const parsedDate = parse(date, DATE_FORMAT, new Date());
        if (isAfter(parsedDate, lastDate)) {
            return { date: lastDate, weight: this.weights.get(lastDate)! };
        }

        return undefined;
    }
    
    /**
     * Get the last weight prior or equals to specified date
     * @param date Date
     * @returns Last weight prior or equals to specified date if exists, undefined otherwise
     */
    getWeightEntryPriorOrEqualToDate(date: string): Weight | undefined {

        const sameDayWeight = this.get(date);
        if (sameDayWeight !== undefined)
            return { date, weight: sameDayWeight };

        return this.getWeightEntryPriorToDate(date);
    }

    /**
     * 
     * @param yearNumber Year of the week (yyyy)
     * @param weekNumber Number of the week (1-52 or 1-53)
     * @returns Week average of specified year-week if exists, undefined otherwise
     */
    getWeekAverage(yearNumber: number, weekNumber: number): number | undefined {
        const weekEntries = this.getAll().filter(e => {
            const d = new Date(e.date);
            const week = getISOWeek(d);
            const year = getYear(d);
            return week === weekNumber && year === yearNumber;
        });

        if (weekEntries.length <= 0) return undefined;

        const sum = weekEntries.reduce((acc, e) => acc + e.weight, 0);
        return sum / weekEntries.length;
    }
}