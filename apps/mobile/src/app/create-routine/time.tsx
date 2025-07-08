import { RoutineTime } from "@blockit/ui";
import { router } from "expo-router";

export default function RoutineTimeScreen() {
    return (
        <RoutineTime
            onBack={() => router.back()}
        />
    );
}