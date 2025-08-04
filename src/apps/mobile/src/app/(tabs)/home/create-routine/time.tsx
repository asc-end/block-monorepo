import { RoutineTime } from "@blockit/ui";
import { router } from "expo-router";
import { useRoutineBackHandler } from "@/hooks/useRoutineBackHandler";

export default function RoutineTimeScreen() {
    useRoutineBackHandler();
    return (
        <RoutineTime
            onBack={() => router.back()}
        />
    );
}