export { HourSelector } from './HourSelector';

export interface HourSelectorProps {
    selectedHours: number[];
    onHoursChange: (hours: number[]) => void;
    currentColors: any;
}