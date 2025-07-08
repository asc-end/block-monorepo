import { RoutineCalendar } from "@blockit/ui";
import { router } from "expo-router";

export default function CalendarScreen() {
    return (
        <RoutineCalendar onBack={() => router.back()} />
    );
}