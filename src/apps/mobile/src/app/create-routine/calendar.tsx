import { RoutineCalendar } from "@blockit/ui";
import { router } from "expo-router";
import { useRoutineBackHandler } from "@/hooks/useRoutineBackHandler";

export default function CalendarScreen() {
    useRoutineBackHandler();
    return (
        <RoutineCalendar onBack={() => router.back()} />
    );
}